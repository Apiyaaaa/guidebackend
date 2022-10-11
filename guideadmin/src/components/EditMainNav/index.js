import { Button,TextField } from "@mui/material";

function EditMainNav(props) {
  const data = [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }];
  return (
    <div>
      
      <br />
      <TextField
        fullWidth
        multiline
        label="左上"
        value={data[0].id}
        inputProps={{ field: "leftTop" }}
      ></TextField>
      <br />
      <br />
      <TextField
        fullWidth
        multiline
        label="右上"
        value={data[1].id}
        inputProps={{ field: "rightTop" }}
      ></TextField>
      <br />
      <br />
      <TextField
        fullWidth
        multiline
        label="左下"
        value={data[2].id}
        inputProps={{ field: "leftBot" }}
      ></TextField>
      <br />
      <br />
      <TextField
        fullWidth
        multiline
        label="右下"
        value={data[3].id}
        inputProps={{ field: "rightBot" }}
      ></TextField>
      <br />
      <Button>提交</Button>
    </div>
  );
}

export default EditMainNav;
