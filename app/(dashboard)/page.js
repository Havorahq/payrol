"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./dashboard.module.scss";
import Wrapper from "../components/wrapper/Wrapper";
import Button from "../components/common/Button";
import { FaPlus } from "react-icons/fa";
import { RiFileCheckLine } from "react-icons/ri";
import { LuArrowRight } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa6";
import { BiLeaf, BiDollarCircle } from "react-icons/bi";
import { ImCancelCircle } from "react-icons/im";
import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";

export default function Home() {
  const [contract, setContract] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("user").select("*");
      if (error) {
        console.error(error);
      } else {
        setContract(data);
      }
    };

    fetchData();
  }, []);

  console.log({ contract });
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
            <div className="x-axis">
              <p>Active Contract</p>
              <RiFileCheckLine />
            </div>
            <FaArrowRight />
          </div>
          <div className={styles.cardBody}>10</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className="x-axis">
              <p>Pending Contract</p>
              <BiLeaf />
            </div>
            <FaArrowRight />
          </div>
          <div className={styles.cardBody}>2</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className="x-axis">
              <p>Cancelled Contract</p>
              <ImCancelCircle />
            </div>
          </div>
          <div className={styles.cardBody}>2</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className="x-axis">
              <p>Payment Due</p>
              <BiDollarCircle />
            </div>
          </div>
          <div className={styles.cardBody}>80,576</div>
        </div>
      </div>

      <div></div>
    </Wrapper>
  );
}
