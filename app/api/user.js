import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { data, error } = await supabase.from("user").insert([req.body]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export async function getServerSideProps(context) {
  const { data, error } = await supabase.from("user").select("*");

  console.log({ data });

  if (error) {
    console.error(error);
    return { props: { error: error.message } };
  }

  return { props: { data } };
}
