import { List, Card } from "antd";
import { Link } from "react-router-dom";

const data = [
  {
    title: "GOBERNACIÓN DE LOS ANDES",
    image: "litio.jfif",
    path: "gobernacion_de_los_andes",
    icon: "🏛️",
  },
  {
    title: "GEOLOGÍA",
    image: "geologia.jfif",
    path: "geologia",
    icon: "🪨",
  },
  {
    title: "MINEROLOGÍA Y MINERÍA",
    image: "minerologia.jfif",
    path: "minerologia_y_mineria",
    icon: "⛏️",
  },
  {
    title: "BIODIVERSIDAD",
    image: "biodiversidad.jfif",
    path: "biodiversidad",
    icon: "🌱",
  },
  {
    title: "ARQUEOLOGÍA",
    image: "arqueologia.jfif",
    path: "arqueologia",
    icon: "🏺",
  },
  {
    title: "RAMAL C14",
    image: "ramalC14.jfif",
    path: "ramal_c14",
    icon: "🚆",
  },
  {
    title: "SAN ANTONIO HOY",
    image: "san_antonio_cobres.jfif",
    path: "san-antonio-hoy",
    icon: "📰",
  },
  {
    title: "HISTORIA",
    image: "historia_museo.png",
    path: "historia",
    icon: "📜",
  },
];

export const Salas = () => {
  return (
    <List
      grid={{ gutter: 16, column: 1 }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Link to={`/salas/${item.path}`}>
            <Card hoverable style={{ padding: 0 }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: "12px",
                    marginRight: "16px",
                  }}
                />
                <div
                  style={{
                    backgroundColor: "#e5d4cb",
                    padding: "16px",
                    borderRadius: "12px",
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ fontWeight: "bold", textAlign: "left" }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: "24px", marginLeft: "10px" }}>
                    {item.icon}
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </List.Item>
      )}
    />
  );
};
