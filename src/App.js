import './App.css';
import { useEffect } from 'react';
import EnhancedTable from "./table";
import React from "react";
import DraggableDialog from "./dialog";
function App() {
  const [items, setItems] = React.useState([{
    "Author": "",
    "Title": "",
    "Creation_Date": ""
  }])

  const [dialog, setDialog] = React.useState(false)
  const [dialogData, setDialogData] = React.useState({
    "Author": "",
    "Title": "",
    "Creation_Date": ""
  })


  useEffect(() => {
    var arr = []
    fetch("https://api.stackexchange.com/2.2/search/advanced?page=1&pagesize=20&order=desc&sort=activity&site=stackoverflow")
      .then(response => response.json())
      .then(responseJson => {
        for (var i = 0; i < responseJson.items.length; i++) {
          arr.push(
            {
              "Author": responseJson.items[i].owner.display_name,
              "Title": responseJson.items[i].title,
              "Creation_Date": responseJson.items[i].creation_date,
              "link": responseJson.items[i].link
            }
          )
        }
        setItems(arr)
      })
  }, [])
  return (
    <div className="App">
      <EnhancedTable
        openDialog={(row) => {
          setDialog(true)
          setDialogData(row)
        }}
        page={1}
        limit={20}
        data={items}
      />
      <DraggableDialog
        open={dialog}
        dialogData={dialogData}
        close={() => {
          setDialog(false)
        }}
      />
    </div>
  );
}

export default App;
