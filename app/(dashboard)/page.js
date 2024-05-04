"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./dashboard.module.scss";
import Wrapper from "../components/wrapper/Wrapper";
import Button from "../components/common/Button";
import { FaPlus, FaSearch } from "react-icons/fa";
import { RiFileCheckLine } from "react-icons/ri";
import { LuArrowRight } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa6";
import { BiLeaf, BiDollarCircle } from "react-icons/bi";
import { ImCancelCircle } from "react-icons/im";
import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";

export default function Home() {
  const [contract, setContract] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchContract = async () => {
      const { data, error } = await supabase
        .from("contract")
        .select("*")
        .eq("employerId", "employerId");
      if (error) {
        console.error(error);
      } else {
        setContract(data);
      }
    };

    fetchContract();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("user")
        .insert([{ first_name: "otimade", email: "otimade@gmail.com" }]);
      console.log("done");
      if (error) {
        console.error(error);
      } else {
        setUser(data);
      }
    };

    fetchUser();
  }, []);

  console.log({ contract, user });

  return (
    <Wrapper>
      <div className={styles.dashboardHeader}>
        <p className="w-100">Total Contract</p>
        <Link href="/create-contract">
          <div className={`${styles.addButton} x-axis gap-1`}>
            <FaPlus />
            <div className="w-100">Contract</div>
          </div>
        </Link>
      </div>

      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className="x-axis gap-1">
              <p>Active Contract</p>
              <RiFileCheckLine />
            </div>
            <FaArrowRight />
          </div>
          <div className={styles.cardBody}>10</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className="x-axis gap-1">
              <p>Pending Contract</p>
              <BiLeaf />
            </div>
            <FaArrowRight />
          </div>
          <div className={styles.cardBody}>2</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className="x-axis gap-1">
              <p>Cancelled Contract</p>
              <ImCancelCircle />
            </div>
          </div>
          <div className={styles.cardBody}>2</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className="x-axis gap-1">
              <p>Payment Due</p>
              <BiDollarCircle />
            </div>
          </div>
          <div className={styles.cardBody}>80,576</div>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <p className={styles.tableTitle}>All Contract</p>
          <div className="inputGroup">
            <FaSearch color="#797979" />
            <input type="text" placeholder="Search names" />
          </div>
        </div>

        {/* <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>George Reynolds</td>
              <td>Georgereynolds@gmail.com</td>
              <td>$1000</td>
              <td>Fixed</td>
              <td>Active</td>
              <td>View</td>
            </tr>
            <tr>
              <td>2</td>
              <td>George Reynolds</td>
              <td>Georgereynolds@gmail.com</td>
              <td>$1000</td>
              <td>Fixed</td>
              <td>Active</td>
              <td>View</td>
            </tr>
          </tbody>
        </table> */}
      </div>
    </Wrapper>
  );
}
