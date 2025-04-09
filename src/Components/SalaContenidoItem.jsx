// components/SalaContenidoItem.jsx
export const SalaContenidoItem = ({ img, children, reverse = false }) => {
    return (
      <div className={`sala-item ${reverse ? "reverse" : ""}`}>
        <img src={img} alt="imagen sala" className="sala-item-img" />
        <div className="sala-item-text">
          {children}
        </div>
      </div>
    );
  };
  