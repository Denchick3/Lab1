import { Row, Col, Card } from "antd";

const ComputerCards = [
  {
    Name: "Lenovo",
    Proccesor: "Intel",
    Display: 16,
    RAM: 8,
    PSU: 2,
    Storage: 256,
    Src: "/lenovo.png",
  },
  {
    Name: "ASUS",
    Proccesor: "Intel",
    Display: 18,
    RAM: 16,
    PSU: 4,
    Storage: 526,
    Src: "/asus.png",
  },
  {
    Name: "LG",
    Proccesor: "Intel",
    Display: 21,
    RAM: 32,
    PSU: 2,
    Storage: 128,
    Src: "/lg.png",
  },
];

export const Content = () => {
  return (
    <Row justify="center" align="middle" gutter={16}>
      {ComputerCards.map((card, index) => (
        <Col key={index} span={6}>
          <Card title={card.Name} style={{ width: 300, marginTop: "40px" }}>
            <img
              src={card.Src}
              alt="logo"
              style={{
                width: 300,
              }}
            />
            <p>Display: {card.Display}</p>
            <p>Proccesor: {card.Proccesor}</p>
            <p>RAM: {card.RAM}</p>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
