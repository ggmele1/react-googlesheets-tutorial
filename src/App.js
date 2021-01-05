import React, { useEffect } from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";
import creds from "./tutorial_keys.json";

const App = () => {
  const doc = new GoogleSpreadsheet(creds.sheets_id);

  useEffect(() => {
    async function fetchData() {
      await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key,
      });
      await doc.loadInfo();
      getRows();
    }
    fetchData();
  });

  const getRows = async () => {
    let sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    const getData = rows.map((item) => [
      {
        firstname: item.firstname,
        lastname: item.lastname,
        website: item.website,
      },
    ]);
    console.log(getData);
  };

  const addRow = async () => {
    let sheet = doc.sheetsByIndex[0];
    await sheet.addRow({
      firstname: "Bob",
      lastname: "Lazar",
      website: "boblazar.com",
    });
  };

  return (
    <div>
      <button
        onClick={() => {
          addRow();
        }}
      >
        Add Row
      </button>
    </div>
  );
};

export default App;
