import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

const SpeechContext = createContext();

export const SpeechProvider = ({ children }) => {
  const [readableText, setReadableText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [canSpeak, setCanSpeak] = useState(false);

  // Efecto para comprobar soporte una sola vez al montar el Provider
  useEffect(() => {
    const support = "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== 'undefined';
    setCanSpeak(support);
    console.log("SpeechProvider Montado. Soporte de Síntesis de Voz:", support);
  }, []); // Array vacío, solo se ejecuta una vez

  // --- Función registerText ESTABLE ---
  // Su única responsabilidad es actualizar el texto.
  // useCallback con array vacío asegura que su referencia nunca cambie.
  const registerText = useCallback((text) => {
    const newText = text || '';
    console.log("Registering text:", newText ? `"${newText.substring(0, 50)}..."` : "EMPTY");
    setReadableText(newText);
    // **IMPORTANTE: Quitamos la lógica de cancelación de aquí**
    // No debe cancelar la voz solo porque el texto se registró de nuevo.
  }, []); // <<<--- Array de dependencias VACÍO para estabilidad

  // --- Función speakText (con lógica de parada y cancelación previa) ---
  const speakText = useCallback(() => {
    console.log("Función speakText llamada.");
    console.log("Soporte:", canSpeak, "| Hablando:", isSpeaking, "| Texto:", !!readableText);

    if (!canSpeak) {
      console.warn("La síntesis de voz no es soportada por este navegador.");
      return;
    }

    // Lógica de PARADA: Si se hace clic mientras está hablando
    if (isSpeaking) {
      console.log("Botón presionado mientras hablaba: Deteniendo.");
      window.speechSynthesis.cancel(); // Llama a cancel para detener
      // El estado isSpeaking se actualizará a false por el evento onend o onerror
      // que cancel() dispara implícitamente, o lo forzamos si es necesario.
      // Considera forzarlo aquí si 'cancel' no siempre dispara 'onend':
      setIsSpeaking(false);
      return;
    }

    // Si no está hablando, pero no hay texto
    if (!readableText) {
      console.log("No hay texto para leer.");
      return;
    }

    // --- Proceder a hablar ---
    const utterance = new SpeechSynthesisUtterance(readableText);
    utterance.lang = "es-ES";
    utterance.rate = 1;
    utterance.pitch = 1;

    // --- Manejadores de Eventos ---
    utterance.onstart = () => {
      console.log("Evento: onstart - Síntesis iniciada.");
      setIsSpeaking(true);
    };
    utterance.onend = () => {
      // Este evento se dispara cuando la síntesis termina *normalmente*
      // o también después de llamar a cancel().
      console.log("Evento: onend - Síntesis finalizada o cancelada.");
      setIsSpeaking(false);
    };
    utterance.onerror = (event) => {
      console.error('Evento: onerror - Error en síntesis:', event.error, event);
      setIsSpeaking(false); // Asegurarse de resetear en error
    };

    // Cancelar explícitamente CUALQUIER cosa anterior ANTES de intentar hablar
    console.log("Llamando a cancel() antes de speak()");
    window.speechSynthesis.cancel();

    // Pausa de seguridad (Workaround)
    setTimeout(() => {
      console.log("Llamando a speak()");
      window.speechSynthesis.speak(utterance);
    }, 100);

  // Dependencias correctas: la función depende de estos estados/valores para operar
  }, [readableText, isSpeaking, canSpeak]);

  // Efecto de limpieza opcional: cancelar si el Provider se desmonta
  useEffect(() => {
    return () => {
      console.log("SpeechProvider Desmontado: Cancelando si estaba hablando.");
      window.speechSynthesis.cancel();
    };
  }, []); // Se ejecuta solo al desmontar


  return (
    <SpeechContext.Provider value={{ registerText, speakText, isSpeaking, canSpeak }}>
      {children}
    </SpeechContext.Provider>
  );
};

export const useSpeech = () => useContext(SpeechContext);