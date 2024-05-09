import { supabase } from "./../../lib/supabaseClient";

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

export const handleSignUpServer = async (
  firstName,
  lastName,
  email,
  publicAddress
) => {
  try {
    const { data, error } = await supabase.from("user").insert([
      {
        first_name: firstName,
        last_name: lastName,
        email,
        public_Address: publicAddress,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const handleLogin = async (publicAddress) => {
  console.log({ publicAddress });
  try {
    const { data, error } = await supabase
      .from("user")
      .select()
      .eq("public_address", publicAddress);

    if (error) {
      throw new Error(error.message);
    }

    if (data.length > 0) {
      return { data, error: null };
    } else {
      return null;
    }
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export async function getServerSideProps(context) {
  const { data, error } = await supabase.from("user").select("*");

  if (error) {
    console.error(error);
    return { props: { error: error.message } };
  }

  return { props: { data } };
}
