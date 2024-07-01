import { supabase } from "../../lib/supabaseClient";

interface User {
  user_type: string;
  first_name: string;
  last_name: string;
  email: string;
  business_name?: string;
  business_email?: string;
  public_address: string;
}

export const handleSignUpServer = async (
  user_type: string,
  firstName: string,
  lastName: string,
  email: string,
  publicAddress: string,
  businessName?: string,
  businessEmail?: string
) => {
  try {
    const newUser: User = {
      user_type,
      first_name: firstName,
      last_name: lastName,
      email,
      public_address: publicAddress,
      business_name: businessName,
      business_email: businessEmail,
    };
    const { data, error } = await supabase.from("user").insert([newUser]);

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

export const findContractById = async (id) => {
  try {
    const contract = await supabase.from("contract").select().eq("id", id);

    if (!contract) {
      // User not found, redirect to signup
      return { data: null, error: "contract not found. Please sign up." };
    }

    return { data: contract, error: null };
  } catch (error) {
    console.log("Error logging in:", error);
    return { data: null, error: "An error occurred. Please try again." };
  }
};

export const findAllEmployerContract = async (user_email) => {
  try {
    const contract = await supabase
      .from("contract")
      .select("*") // Select all user columns (adjust as needed)
      .eq("employer_id", user_email);

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

export const findAllEmployeeContract = async (user_email) => {
  try {
    const contract = await supabase
      .from("contract")
      .select("*") // Select all user columns (adjust as needed)
      .eq("employee_id", user_email);

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

export const handleCreateContract = async (contractObj) => {
  try {
    const { data, error } = await supabase.from("contract").insert([
      {
        contract_address: contractObj.contractAddress,
        employer_id: contractObj.employerEmail,
        employee_id: contractObj.employeeEmail,
        payment: contractObj.monthlyRate,
        status: "pending",
        token_address: contractObj.tokenAddress,
        contract_type: contractObj.contractType,
        job_title: contractObj.jobTitle,
        job_description: contractObj.jobDescription,
        business_name: contractObj.businessName,
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

export const handleEmployeeEnterContract = async (
  contractId,
  paymentAddress
) => {
  try {
    const contract = await supabase
      .from("contract")
      .update({ status: "active", payment_address: paymentAddress })
      .eq("id", contractId);

    if (!contract) {
      // User not found, redirect to signup
      return { data: null, error: "Could not update contract, try again" };
    }

    return { data: contract, error: null };
  } catch (error) {
    console.error("Error logging in:", error);
    return { data: null, error: "An error occurred. Please try again." };
  }
};

export const handleUpdatePayment = async (contractId, payment_status) => {
  try {
    const contract = await supabase
      .from("contract")
      .update({ payment_status })
      .eq("id", contractId);

    if (!contract) {
      // User not found, redirect to signup
      return { data: null, error: "Could not update contract, try again" };
    }

    return { data: contract, error: null };
  } catch (error) {
    console.error("Error logging in:", error);
    return { data: null, error: "An error occurred. Please try again." };
  }
};

export const fetchAllContract = async () => {
  try {
    const contract = await supabase.from("contract").select("*");

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
