const GenderCheckBox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className="flex">
      <div className="form-control ">
        <label
          htmlFor=""
          className={`label ${
            selectedGender === "male" ? "selected" : ""
          } gap-2 cursor-pointer`}
        >
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            name="male"
            checked={selectedGender === "male"}
            onChange={() => onCheckboxChange("male")}
            className="checkbox border-slate-900"
            id="male"
          />
        </label>
      </div>
      <div className="form-control ">
        <label
          htmlFor=""
          className={`label  ${
            selectedGender === "female" ? "selected" : ""
          }  gap-2 cursor-pointer`}
        >
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            name="female"
            className="checkbox border-slate-900"
            checked={selectedGender === "female"}
            onChange={() => onCheckboxChange("female")}
            id="female"
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckBox;

// starter code for gender component
// const GenderCheckBox = () => {
//   return (
//     <div className="flex">
//       <div className="form-control ">
//         <label htmlFor=""  className={`label gap-2 cursor-pointer`}>
//           <span className="label-text">Male</span>
//           <input type="checkbox" name="gender" className="checkbox border-slate-900k" id="" />
//         </label>
//       </div>
//       <div className="form-control ">
//         <label htmlFor=""  className={`label gap-2 cursor-pointer`}>
//           <span className="label-text">Female</span>
//           <input type="checkbox" name="genderr" className="checkbox border-slate-900k" id="" />
//         </label>
//       </div>
//     </div>
//   );
// };

// export default GenderCheckBox;
