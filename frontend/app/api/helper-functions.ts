import { supabase } from "../../lib/supabaseClient";

export const createCompany = async (
  name: string,
  email: string,
  headquartersLocation: string,
  numberOfEmployees: number
) => {
  try {
    const newCompany = {
      name,
      email,
      headquarters_location: headquartersLocation,
      number_of_employees: numberOfEmployees,
    };
    const { data, error } = await supabase
      .from("companies")
      .insert([newCompany]);

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: "An error occurred" };
  }
};

export const createEmployer = async (
  legalName: string,
  email: string,
  position: string,
  companyId: string
) => {
  try {
    const newEmployer = {
      legal_name: legalName,
      email,
      position,
      company_id: companyId,
    };
    const { data, error } = await supabase
      .from("employers")
      .insert([newEmployer]);

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: "An error occurred" };
  }
};

export const createEmployee = async (
  legalName: string,
  email: string,
  location: string
) => {
  try {
    const newEmployee = {
      legal_name: legalName,
      email,
      location,
    };
    const { data, error } = await supabase
      .from("employees")
      .insert([newEmployee]);

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

export const findUser = async (publicAddress: string) => {
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
