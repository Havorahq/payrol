import { supabase } from "../../lib/supabaseClient";

export const createCompany = async (
  firstName: string,
  lastName: string,
  email: string,
  address: string = "",
  userType: string,
  businessName: string,
  businessEmail: string,
  businessSize: string,
  industry: string
): Promise<{
  companyData: any | null;
  userData: any | null;
  error: string | null;
}> => {
  try {
    // Create company

    const company = {
      businessName,
      businessEmail,
      businessSize,
      industry,
    };
    const { data: companyData, error: companyError } = await supabase
      .from("companies")
      .insert([company]);

    if (companyError)
      throw new Error(`Failed to create company: ${companyError.message}`);

    // Create user (employer) using the createUser function
    const { data: userData, error: userError } = await createUser(
      firstName,
      lastName,
      email,
      address,
      userType
    );

    if (userError) throw new Error(userError);

    return { companyData, userData, error: null };
  } catch (error) {
    return { companyData: null, userData: null, error: "Rollback_transaction" };
  }
};
export const createUser = async (
  firstName: string,
  lastName: string,
  email: string,
  address: string,
  userType: string,
  companyId?: string
) => {
  try {
    const user = {
      firstName,
      lastName,
      email,
      address,
      userType,
      companyId,
    };
    const { data, error } = await supabase.from("users").insert([user]);

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: "An error occurred" };
  }
};

export const createContract = async (
  employerId: string,
  employeeId: string,
  jobDescription: string,
  contractType: string,
  startDate: string,
  balance: number,
  status: string,
  endDate?: string,
  milestoneReviewDate?: string
) => {
  try {
    const newContract = {
      employer_id: employerId,
      employee_id: employeeId,
      job_description: jobDescription,
      contract_type: contractType,
      start_date: startDate,
      end_date: endDate,
      milestone_review_date: milestoneReviewDate,
      balance,
      status,
    };
    const { data, error } = await supabase
      .from("contracts")
      .insert([newContract]);

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: "An error occurred" };
  }
};

export const createPayment = async (
  contractId: string,
  amount: number,
  paymentDate: string
) => {
  try {
    const newPayment = {
      contract_id: contractId,
      amount,
      payment_date: paymentDate,
    };
    const { data, error } = await supabase
      .from("payments")
      .insert([newPayment]);

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: "An error occurred" };
  }
};

export const updateContractStatus = async (
  contractId: string,
  status: string
) => {
  try {
    const { data, error } = await supabase
      .from("contracts")
      .update({ status })
      .eq("id", contractId);

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: "An error occurred" };
  }
};

export const getCompanyById = async (companyId: string) => {
  try {
    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .eq("id", companyId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: "An error occurred" };
  }
};

export const getEmployerById = async (employerId: string) => {
  try {
    const { data, error } = await supabase
      .from("employers")
      .select("*")
      .eq("id", employerId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: "An error occurred" };
  }
};

export const getEmployeeById = async (employeeId: string) => {
  try {
    const { data, error } = await supabase
      .from("employees")
      .select("*")
      .eq("id", employeeId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: "An error occurred" };
  }
};

export const getContractById = async (contractId: string) => {
  try {
    const { data, error } = await supabase
      .from("contracts")
      .select("*")
      .eq("id", contractId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: "An error occurred" };
  }
};

export const getUserContract = async (contractId: string) => {
  try {
    const { data, error } = await supabase
      .from("contracts")
      .select("*")
      .eq("id", contractId);

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: "An error occurred" };
  }
};

export const getPaymentById = async (paymentId: string) => {
  try {
    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .eq("id", paymentId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: "An error occurred" };
  }
};

export const findUser = async (email_address: string) => {
  try {
    const user = await supabase
      .from("user")
      .select("*") // Select all user columns (adjust as needed)
      .eq("email", email_address)
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
