// import React, { useEffect, useState } from "react";

// import * as yup from "yup";
// import { useForm, useFieldArray } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { baseUrl } from "../baseUrl";
// import { toast, ToastContainer } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const ValSchema = yup.object().shape({
//   momSiblings: yup.string().required("Mother’s siblings are required"),
//   DadSiblings: yup.string().required("Father’s siblings are required"),
//   maternalGrandmother: yup.string().required("Your Mom’s Mom name is required"),
//   MaternalGrandFather: yup.string().required("Your Mom’s Dad name is required"),
//   paternalGrandmother: yup.string().required("Your Dad’s Mom name is required"),
//   paternalGrandFather: yup.string().required("Your Dad’s Dad name is required"),
//   siblings: yup.array().of(
//     yup.object().shape({
//       name: yup.string().required("Sibling name is required"),
//       partner: yup.string().required("Partner name is required"),
//       children: yup.string().required("Children information is required"),
//     })
//   ),
// });

// const Overjoucomponet = () => {
//   const [data, setData] = useState({});
//   const [OwnFaily, setOwnFaily] = useState(false);
//   const navigate = useNavigate("")
//   const {
//     register,
//     handleSubmit,
//     control,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(ValSchema),
//     defaultValues: {
//       momSiblings: "",
//       DadSiblings: "",
//       maternalGrandmother: "",
//       MaternalGrandFather: "",
//       paternalGrandmother: "",
//       paternalGrandFather: "",
//       YourWife: "",
//       YourDaughter_Son: ["", "", ""],
//       siblings: Array(5).fill({ name: "", partner: "", children: "" }),
//     },
//   });
//   const userId = localStorage.getItem("userId");
//   const { fields } = useFieldArray({
//     control,
//     name: "siblings",
//   });
//   const fetchData = async () => {
//     const response = await fetch(`${baseUrl}/create-story?userId=${userId}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const responseData = await response.json();
//     const storyData = responseData?.find?.storyData;

//     if (storyData) {
//       // ✅ Reset form with fetched data
//       reset({
//         ...storyData,
//         siblings: storyData.siblings.map(({ name, partner, children }) => ({
//           name,
//           partner,
//           children,
//         })),
//       });
//     }
//     if (
//       storyData.YourWife ||
//       (Array.isArray(storyData.YourDaughter_Son) && storyData.YourDaughter_Son.some(val => val && val.trim() !== ""))
//     ) {
//       setOwnFaily(true);
//     }
  

//     setData(responseData?.find || {});
//   };


//   useEffect(() => {
//     fetchData();
//   }, []);
//   // http://localhost:5000/api/get-stories
//   const handleSubmitData = async (values) => {
//     console.log("Submitted Data:", values);
//     const body = {
//       userId,
//       storyData: values,
//     };
//     const response = await fetch(`${baseUrl}/create-story`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     });
//     const data = await response.json();
//     toast.success("Successfully added");

//     if (data?.message === "Data add successfully") {
//       setTimeout(() => navigate("/dashboard"), 2000);
//     } else {
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <div className="main-Overjoucomponet">
//       <ToastContainer autoClose={1000} />
//       {/* Uncles/Aunts */}
//       <form onSubmit={handleSubmit(handleSubmitData)}>
//         <div className="Overjoucomponet-box">
//           <div className="Overjoucomponet-heading">
//             <h2>If You Have Uncles or Aunts, What are their Names?</h2>
//           </div>
//           <div className="Overjoucomponet-in-box">
//             <div className="Overjoucomponet-group">
//               <label>Your Mom’s Brothers & Sisters</label>
//               <input
//                 type="text"
//                 placeholder="Type here...."
//                 {...register("momSiblings")}
//               />
//               {errors.momSiblings && (
//                 <p style={{ color: "red" }}>{errors.momSiblings.message}</p>
//               )}
//             </div>

//             <div className="Overjoucomponet-group">
//               <label>Your Dad’s Brothers & Sisters</label>
//               <input
//                 type="text"
//                 placeholder="Type here...."
//                 {...register("DadSiblings")}
//               />
//               {errors.DadSiblings && (
//                 <p style={{ color: "red" }}>{errors.DadSiblings.message}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Grandparents */}
//         <div className="Overjoucomponet-box">
//           <div className="Overjoucomponet-heading">
//             <h2>What are Your Grandparents Names?</h2>
//           </div>
//           <div className="Overjoucomponet-in-box">
//             <div className="Overjoucomponet-group">
//               <label>Your Mom’s Mom</label>
//               <input
//                 type="text"
//                 placeholder="Type here...."
//                 {...register("maternalGrandmother")}
//               />
//               {errors.maternalGrandmother && (
//                 <p style={{ color: "red" }}>
//                   {errors.maternalGrandmother.message}
//                 </p>
//               )}
//             </div>

//             <div className="Overjoucomponet-group">
//               <label>Your Mom’s Dad</label>
//               <input
//                 type="text"
//                 placeholder="Type here...."
//                 {...register("MaternalGrandFather")}
//               />
//               {errors.MaternalGrandFather && (
//                 <p style={{ color: "red" }}>
//                   {errors.MaternalGrandFather.message}
//                 </p>
//               )}
//             </div>

//             <div className="Overjoucomponet-group">
//               <label>Your Dad’s Mom</label>
//               <input
//                 type="text"
//                 placeholder="Type here...."
//                 {...register("paternalGrandmother")}
//               />
//               {errors.paternalGrandmother && (
//                 <p style={{ color: "red" }}>
//                   {errors.paternalGrandmother.message}
//                 </p>
//               )}
//             </div>

//             <div className="Overjoucomponet-group">
//               <label>Your Dad’s Dad</label>
//               <input
//                 type="text"
//                 placeholder="Type here...."
//                 {...register("paternalGrandFather")}
//               />
//               {errors.paternalGrandFather && (
//                 <p style={{ color: "red" }}>
//                   {errors.paternalGrandFather.message}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Your OWN Family */}
//         <div className="Overjoucomponet-box">
//           <div className="Overjoucomponet-heading Family-Checkbox">
//             <h2>What about Your Family? Do Your Have Any</h2>
//             <input
//               type="checkbox"
//               name="OwnFamily"
//               id="OwnFamily"
//               onChange={(e) => setOwnFaily(e.target.checked)}
//             />
//           </div>

//           {OwnFaily &&
//             <div className="Overjoucomponet-in-box">
//               <div className="Overjoucomponet-group">
//                 <label>Your Wife</label>
//                 <input
//                   type="text"
//                   placeholder="Type here...."
//                   {...register("YourWife")}
//                 />
//               </div>

//               {[0, 1, 2].map((index) => (
//                 <div className="Overjoucomponet-group" key={index}>
//                   <label>Your Daughter/Son</label>
//                   <input
//                     type="text"
//                     placeholder="Type here...."
//                     {...register(`YourDaughter_Son[${index}]`)}
//                   />
//                 </div>
//               ))}
//             </div>
//           }

//         </div>

//         {/* Siblings */}
//         <div className="Overjoucomponet-box">
//           <div className="Overjoucomponet-heading">
//             <h2>If You Have Siblings, What are their Names</h2>
//           </div>
//           <div className="Overjoucomponet-in-box">
//             <div className="Overjoucomponet-group short-Overjoucomponet">
//               <label>Sibling’s Name</label>
//               {fields.map((field, index) => (
//                 <input
//                   key={`name-${field.id}`}
//                   type="text"
//                   placeholder="Type here...."
//                   {...register(`siblings[${index}].name`)}
//                 />
//               ))}
//             </div>

//             <div className="Overjoucomponet-group short-Overjoucomponet">
//               <label>Their Partner</label>
//               {fields.map((field, index) => (
//                 <input
//                   key={`partner-${field.id}`}
//                   type="text"
//                   placeholder="Type here...."
//                   {...register(`siblings[${index}].partner`)}
//                 />
//               ))}
//             </div>

//             <div className="Overjoucomponet-group short-Overjoucomponet">
//               <label>Their Children</label>
//               {fields.map((field, index) => (
//                 <input
//                   key={`children-${field.id}`}
//                   type="text"
//                   placeholder="Type here...."
//                   {...register(`siblings[${index}].children`)}
//                 />
//               ))}
//             </div>
//           </div>

//           <div className="Overjoucomponet-save-btn">
//             <button type="submit">Save Story</button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Overjoucomponet;


import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { baseUrl } from "../baseUrl";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ValSchema = yup.object().shape({
  momSiblings: yup.string().required("Aunt and Uncle details required"),
  DadSiblings: yup.string().required("Aunt and Uncle details required"),
  maternalGrandmother: yup.string().required("Mom Great-Grandmother name required"),
  MaternalGrandFather: yup.string().required("Mom Great-Grandfather name required"),
  paternalGrandmother: yup.string().required("Dad Great-Grandmother name required"),
  paternalGrandFather: yup.string().required("Dad Great-Grandfather name required"),
  siblings: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Sibling name is required"),
      partner: yup.string().required("Partner name is required"),
      children: yup.string().required("Children info is required"),
    })
  ),
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
      momSiblings: "",
      DadSiblings: "",
      maternalGrandmother: "",
      MaternalGrandFather: "",
      paternalGrandmother: "",
      paternalGrandFather: "",
      YourWife: "",
      YourDaughter_Son: ["", "", ""],
      siblings: Array(5).fill({ name: "", partner: "", children: "" }),
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "siblings",
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
      reset({
        ...storyData,
        siblings: storyData.siblings.map(({ name, partner, children }) => ({
          name,
          partner,
          children,
        })),
      });
    }

    if (
      storyData.YourWife ||
      (Array.isArray(storyData.YourDaughter_Son) &&
        storyData.YourDaughter_Son.some(val => val && val.trim() !== ""))
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

        {/* Great-Grandparents */}
        <div className="Overjoucomponet-box">
          <div className="Overjoucomponet-heading">
            <h2>Great-Grandparents</h2>
          </div>
          <div className="Overjoucomponet-in-box">
            <div className="Overjoucomponet-group">
              <label>Dad Great-Grandfather</label>
              <input type="text" {...register("paternalGrandFather")} />
              {errors.paternalGrandFather && <p style={{ color: "red" }}>{errors.paternalGrandFather.message}</p>}
            </div>

            <div className="Overjoucomponet-group">
              <label>Dad Great-Grandmother</label>
              <input type="text" {...register("paternalGrandmother")} />
              {errors.paternalGrandmother && <p style={{ color: "red" }}>{errors.paternalGrandmother.message}</p>}
            </div>

            <div className="Overjoucomponet-group">
              <label>Mom Great-Grandfather</label>
              <input type="text" {...register("MaternalGrandFather")} />
              {errors.MaternalGrandFather && <p style={{ color: "red" }}>{errors.MaternalGrandFather.message}</p>}
            </div>

            <div className="Overjoucomponet-group">
              <label>Mom Great-Grandmother</label>
              <input type="text" {...register("maternalGrandmother")} />
              {errors.maternalGrandmother && <p style={{ color: "red" }}>{errors.maternalGrandmother.message}</p>}
            </div>
          </div>
        </div>
    

               {/* Self & Partner */}
        <div className="Overjoucomponet-box">
        <div className="Overjoucomponet-heading Family-Checkbox">
            <h2>Your Own Family</h2>
            {/* <input type="checkbox" onChange={(e) => setOwnFaily(e.target.checked)} checked={OwnFaily} /> */}
          </div>

      <div className="Overjoucomponet-in-box">
        <div className="Overjoucomponet-group">
          <label>Me</label>
          <input type="text" {...register("me")} />
        </div>

        <div className="Overjoucomponet-group">
          <label>Wife</label>
          <input type="text" {...register("YourWife")} />
        </div>

        <div className="Overjoucomponet-group">
          <label>Cousin 1</label>
          <input type="text" {...register("cousin1")} />
        </div>

        <div className="Overjoucomponet-group">
          <label>Cousin 2</label>
          <input type="text" {...register("cousin2")} />
        </div>

        <div className="Overjoucomponet-group">
          <label>Cousin’s Husband</label>
          <input type="text" {...register("cousinHusband")} />
        </div>

        <div className="Overjoucomponet-group">
          <label>Son</label>
          <input type="text" {...register("YourDaughter_Son[0]")} />
        </div>

        <div className="Overjoucomponet-group">
          <label>Daughter</label>
          <input type="text" {...register("YourDaughter_Son[1]")} />
        </div>

        <div className="Overjoucomponet-group">
          <label>Niece</label>
          <input type="text" {...register("niece")} />
        </div>

        <div className="Overjoucomponet-group">
          <label>Nephew</label>
          <input type="text" {...register("nephew")} />
        </div>
      </div>

  </div>
        {/* Family Tree */}
        <div className="Overjoucomponet-box">
          <div className="Overjoucomponet-heading">
            <h2>Family Tree</h2>
          </div>
          <div className="Overjoucomponet-in-box">
            <div className="Overjoucomponet-group">
              <label>Grandfather</label>
              <input type="text" {...register("grandfather")} />
            </div>

            <div className="Overjoucomponet-group">
              <label>Grandmother</label>
              <input type="text" {...register("grandmother")} />
            </div>

            <div className="Overjoucomponet-group">
              <label>Father</label>
              <input type="text" {...register("father")} />
            </div>

            <div className="Overjoucomponet-group">
              <label>Mother</label>
              <input type="text" {...register("mother")} />
            </div>
          </div>
        </div>

        {/* Aunts & Uncles */}
        <div className="Overjoucomponet-box">
          <div className="Overjoucomponet-heading">
            <h2>Aunts & Uncles</h2>
          </div>
          <div className="Overjoucomponet-in-box">
            <div className="Overjoucomponet-group">
              <label>Uncle 1</label>
              <input type="text" {...register("DadSiblings")} />
              {errors.DadSiblings && <p style={{ color: "red" }}>{errors.DadSiblings.message}</p>}
            </div>

            <div className="Overjoucomponet-group">
              <label>Aunt</label>
              <input type="text" {...register("momSiblings")} />
              {errors.momSiblings && <p style={{ color: "red" }}>{errors.momSiblings.message}</p>}
            </div>

            <div className="Overjoucomponet-group">
              <label>Uncle 2</label>
              <input type="text" {...register("Uncle2")} />
            </div>
          </div>
        </div>

        {/* Siblings Section */}
        <div className="Overjoucomponet-box">
          <div className="Overjoucomponet-heading">
            <h2>Siblings</h2>
          </div>
          <div className="Overjoucomponet-in-box">
            {fields.map((field, index) => (
              <div key={field.id} className="Overjoucomponet-group short-Overjoucomponet">
                <label>Brother / Sister</label>
                <input type="text" {...register(`siblings[${index}].name`)} placeholder="Name" />
                <input type="text" {...register(`siblings[${index}].partner`)} placeholder="Partner" />
                <input type="text" {...register(`siblings[${index}].children`)} placeholder="Children" />
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
