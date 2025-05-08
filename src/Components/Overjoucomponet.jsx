import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { baseUrl } from "../baseUrl";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

 
 

const ValSchema = yup.object().shape({
  dadGrandfather: yup
    .string()
    .required("Dad's grandfather name is required")
    .max(12, "Must be 12 characters or less"),

  dadGrandMother: yup
    .string()
    .required("Dad's grandmother name is required")
    .max(12, "Must be 12 characters or less"),

  momGrandfather: yup
    .string()
    .required("Mom's grandfather name is required")
    .max(12, "Must be 12 characters or less"),

  momGrandMother: yup
    .string()
    .required("Mom's grandmother name is required")
    .max(12, "Must be 12 characters or less"),

  grandfather: yup
    .string()
    .required("Your grandfather name is required")
    .max(12, "Must be 12 characters or less"),

  grandMother: yup
    .string()
    .required("Your grandmother name is required")
    .max(12, "Must be 12 characters or less"),

  father: yup
    .string()
    .required("Father's name is required")
    .max(12, "Must be 12 characters or less"),

  mother: yup
    .string()
    .required("Mother's name is required")
    .max(12, "Must be 12 characters or less"),

  uncle1: yup
    .string()
    .required("First uncle's name is required")
    .max(12, "Must be 12 characters or less"),

  aunt1: yup
    .string()
    .required("First aunt's name is required")
    .max(12, "Must be 12 characters or less"),

  uncle2: yup
    .string()
    .required("Second uncle's name is required")
    .max(12, "Must be 12 characters or less"),

  aunt2: yup
    .string()
    .required("Second aunt's name is required")
    .max(12, "Must be 12 characters or less"),

  brother: yup
    .string()
    .required("Brother's name is required")
    .max(12, "Must be 12 characters or less"),

  sister: yup
    .string()
    .required("Sister's name is required")
    .max(12, "Must be 12 characters or less"),

  cousin1: yup
    .string()
    .required("First cousin's name is required")
    .max(12, "Must be 12 characters or less"),

  cousin2: yup
    .string()
    .required("Second cousin's name is required")
    .max(12, "Must be 12 characters or less"),

  me: yup
    .string()
    .required("Your name is required")
    .max(12, "Must be 12 characters or less"),

  wife: yup
    .string()
    .required("Wife's name is required")
    .max(12, "Must be 12 characters or less"),

  child1: yup
    .string()
    .required("First child's name is required")
    .max(12, "Must be 12 characters or less"),

  child2: yup
    .string()
    .required("Second child's name is required")
    .max(12, "Must be 12 characters or less"),

  child3: yup
    .string()
    .required("Third child's name is required")
    .max(12, "Must be 12 characters or less"),

  child4: yup
    .string()
    .required("Fourth child's name is required")
    .max(12, "Must be 12 characters or less"),
});


 

const Overjoucomponet = () => {
  const [data, setData] = useState({});
  const [OwnFaily, setOwnFaily] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ValSchema),
    defaultValues: {
      dadGrandfather: "",
      dadGrandMother: "",
      momGrandfather: "",
      momGrandMother: "",
      grandfather: "",
      grandMother: "",
      father: "",
      mother: "",
      uncle1: "",
      aunt1: "",
      uncle2: "",
      aunt2: "",
      brother: "",
      sister: "",
      cousin1: "",
      cousin2: "",
      me: "",
      wife: "",
      child1: "",
      child2: "",
      child3: "",
      child4: "",
    },
  });

  const userId = localStorage.getItem("userId");

  const fetchData = async () => {
    const response = await fetch(`${baseUrl}/create-story?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    const storyData = responseData?.find?.storyData;

    if (storyData) {
      reset(storyData);
    }

    if (
      storyData?.wife ||
      [storyData?.child1, storyData?.child2, storyData?.child3, storyData?.child4].some(val => val && val.trim() !== "")
    ) {
      setOwnFaily(true);
    }

    setData(responseData?.find || {});
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmitData = async (values) => {
    const body = {
      userId,
      storyData: values,
    };

    const response = await fetch(`${baseUrl}/create-story`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    toast.success("Successfully added");

    if (data?.message === "Data add successfully") {
      setTimeout(() => navigate("/dashboard"), 2000);
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="main-Overjoucomponet">
      <ToastContainer autoClose={1000} />
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <div className="Overjoucomponet-box">
          <div className="Overjoucomponet-heading"><h2>Family Tree</h2></div>
          <div className="Overjoucomponet-in-box">
            {[
              { label: "Dad's Grandfather", name: "dadGrandfather" },
              { label: "Dad's Grandmother", name: "dadGrandMother" },
              { label: "Mom's Grandfather", name: "momGrandfather" },
              { label: "Mom's Grandmother", name: "momGrandMother" },
              { label: "Grandfather", name: "grandfather" },
              { label: "Grandmother", name: "grandMother" },
              { label: "Father", name: "father" },
              { label: "Mother", name: "mother" },
            ].map(({ label, name }) => (
              <div className="Overjoucomponet-group" key={name}>
                <label>{label}</label>
                <input type="text" {...register(name)} />
                {errors[name] && <p style={{ color: "red" }}>{errors[name].message}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="Overjoucomponet-box">
          <div className="Overjoucomponet-heading"><h2>Aunts & Uncles</h2></div>
          <div className="Overjoucomponet-in-box">
            {[
              { label: "Uncle 1", name: "uncle1" },
              { label: "Aunt 1", name: "aunt1" },
              { label: "Uncle 2", name: "uncle2" },
              { label: "Aunt 2", name: "aunt2" },
            ].map(({ label, name }) => (
              <div className="Overjoucomponet-group" key={name}>
                <label>{label}</label>
                <input type="text" {...register(name)} />
                {errors[name] && <p style={{ color: "red" }}>{errors[name].message}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="Overjoucomponet-box">
          <div className="Overjoucomponet-heading"><h2>Siblings</h2></div>
          <div className="Overjoucomponet-in-box">
            {[
              { label: "Brother", name: "brother" },
              { label: "Sister", name: "sister" },
              { label: "Cousin 1", name: "cousin1" },
              { label: "Cousin 2", name: "cousin2" },
            ].map(({ label, name }) => (
              <div className="Overjoucomponet-group" key={name}>
                <label>{label}</label>
                <input type="text" {...register(name)} />
                {errors[name] && <p style={{ color: "red" }}>{errors[name].message}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="Overjoucomponet-box">
          <div className="Overjoucomponet-heading Family-Checkbox">
            <h2>Your Own Family</h2>
          </div>
          <div className="Overjoucomponet-in-box">
            {[
              { label: "Me", name: "me" },
              { label: "Wife", name: "wife" },
              { label: "Child 1", name: "child1" },
              { label: "Child 2", name: "child2" },
              { label: "Child 3", name: "child3" },
              { label: "Child 4", name: "child4" },
            ].map(({ label, name }) => (
              <div className="Overjoucomponet-group" key={name}>
                <label>{label}</label>
                <input type="text" {...register(name)} />
                {errors[name] && <p style={{ color: "red" }}>{errors[name].message}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="Overjoucomponet-save-btn">
          <button type="submit">Save Story</button>
        </div>
      </form>
    </div>
  );
};

export default Overjoucomponet;
