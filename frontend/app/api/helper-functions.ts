import { supabase } from "../../lib/supabaseClient";

export const createCompany = async (
  firstName: string,
  lastName: string,
  email: string,
  address: string,
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
  contractType: string,
  employerEmail: string,
  employeeEmail: string,
  jobTitle: string,
  jobDescription: string,
  monthlyRate: string,
  status: string,
  payment_status: string,
  milestoneTitle: string,
  milestoneRates: string[],
  startDate?: Date | null,
  endDate?: Date | null,
  hash?: string
) => {
  try {
    const newContract = {
      employer_id: employerEmail,
      employee_id: employeeEmail,
      job_description: jobDescription,
      contract_type: contractType,
      start_date: startDate,
      end_date: endDate,
      job_title: jobTitle,
      amount: monthlyRate,
      status,
      payment_status,
      milestoneTitle,
      milestoneRates,
      hash,
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
  paymentDate: any,
) => {
  try {
    const newPayment = {
      contract_id: contractId,
      payment_date: paymentDate,
      status: 'contract_Funded'
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

export const updatePayment = async (
  contractId: string,
  status: any,
) => {
  try {
    const newPayment = {
      contract_id: contractId,
      status
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

export const acceptContract = async (
  contractId: string,
) => {
  try {
    const { data, error } = await supabase
      .from("contracts")
      .update({ status: "Active", payment_status: "Pending"})
      .eq("id", contractId);

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: "An error occurred" };
  }
};



export const updateContract = async (contractId: string, status:string) => {
  try {
    const { data, error } = await supabase
      .from("contracts")
      .update({ payment_status: status})
      .eq("id", contractId);

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: "An error occurred" };
  }
}

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

export const getUserByEmail = async (email: string) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
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
  console.log(contractId, 'the c id')
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

export const getEmployerContract = async (employerId: string) => {
  try {
    const { data, error } = await supabase
      .from("contracts")
      .select("*")
      .eq("employer_id", employerId);

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: "An error occurred" };
  }
};

export const getEmployeeContract = async (employeeId: string) => {
  try {
    const { data, error } = await supabase
      .from("contracts")
      .select("*")
      .eq("employee_id", employeeId);

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: "An error occurred" };
  }
};

export const getContracts = async (userType: string, userId: string) => {
  let contracts;
  if (userType === "business") {
    contracts = await getEmployerContract(userId);
  } else if (userType === "employee") {
    contracts = await getEmployeeContract(userId);
  }
  return { contracts };
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
  if (!email_address) {
    return null; // or some default value
  }
  try {
    const user = await supabase
      .from("users")
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
