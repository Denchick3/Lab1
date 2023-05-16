import { Row, Col, Button, Card } from "antd";
import storeProvider from "./mst/store/StorePProvider";
import { observer } from "mobx-react-lite";

export const LocalStorageData = observer(() => {
  const { contents, contents_notes, addNote, removeNote } = storeProvider;

  return (
    <>
      {contents.map((noteCategory) => (
        <Row
          key={noteCategory?.id}
          justify="center"
          gutter={[16, 16]}
          style={{ margin: "20px", width: "100%" }}
        >
          <Col span={16}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "30px",
              }}
            >
              <label>
                {noteCategory.title}:
                <input
                  type="text"
                  value={noteCategory.notes}
                  style={{
                    marginLeft: "10px",
                  }}
                  onChange={(e) => noteCategory.changeNotes(e.target.value)}
                />
              </label>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "20px",
                }}
              >
                <Button
                  style={{ marginRight: "10px" }}
                  onClick={() => addNote(noteCategory)}
                >
                  Add
                </Button>
                <Button onClick={() => removeNote(noteCategory.id)}>
                  Remove
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      ))}

      <Row justify="center">
        {contents_notes.map((note) => (
          <Col key={note?.id} span={6}>
            <Card style={{ width: 300 }}>
              <p>{note?.notes}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
});
