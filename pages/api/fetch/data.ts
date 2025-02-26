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

    (async () => {
      console.log(await dataManager.fetchFromDB(component));
      console.log(await dataManager.fetchDataLimit(component, 1));
    })();



    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}