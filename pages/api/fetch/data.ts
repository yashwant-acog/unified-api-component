import { NextApiRequest, NextApiResponse } from "next";
import { Data } from "@/lib/data";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { component } = req.query;
    if (typeof component !== "string") {
      return res.status(400).json({ error: "Invalid component parameter" });
    }
    const dataManager = new Data();

    const data = dataManager.fetchData(component);

    // (async () => {
    //   console.log("From DB: ",await dataManager.fetchFromDB(component));
    //   console.log("From DB with LIMIT: ",await dataManager.fetchDataLimit(component, 1));
    //   console.log("From LOCAL: ",await dataManager.fetchData(component));
    //   console.log("From SOURCE: ",await dataManager.fetchFromSource('api','http://localhost:3000/api/fetch/data?component=students'));
    // })();



    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}