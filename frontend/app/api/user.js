import { supabase } from "./../../lib/supabaseClient";

export const handleSignUpServer = async (
  user_type,
  firstName,
  lastName,
  email,
  // user_type,
  businessName,
  businessEmail,
  publicAddress
) => {
  try {
    const { data, error } = await supabase.from("user").insert([
      {
        first_name: firstName,
        last_name: lastName,
        email,
        user_type,
        public_address: publicAddress,
        business_name: businessName,
        business_email: businessEmail,
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

export const findUser = async (publicAddress) => {
  try {
    const user = await supabase
      .from("user")
      .select("*") // Select all user columns (adjust as needed)
      .eq("public_address", publicAddress)
      .single();

    if (!user) {
      // User not found, redirect to signup
      return { data: null, error: "User not found. Please sign up." };
    }

    return { data: user, error: null };
  } catch (error) {
    console.error("Error logging in:", error);
    return { data: null, error: "An error occurred. Please try again." };
  }
};

export const findContract = async (employer_email, employee_email) => {
  try {
    const contract = await supabase
      .from("contract")
      .select("*") // Select all user columns (adjust as needed)
      .eq("employer_email", employer_email)
      .eq("employee_email", employee_email)
      .single();

    if (!contract) {
      // User not found, redirect to signup
      return { data: null, error: "contract not found. Please sign up." };
    }

    return { data: contract, error: null };
  } catch (error) {
    console.error("Error logging in:", error);
    return { data: null, error: "An error occurred. Please try again." };
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
