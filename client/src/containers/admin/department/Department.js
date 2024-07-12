import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Department() {
  const queryParam = useQuery();
  const [form, setForm] = useState({
    name: "",
    image: null,
    university: queryParam.get("id"),
  });
  const [formError, setFormError] = useState({ name: "", image: "" });
  const [departments, setDepartments] = useState(null);
  const [departmentId, setDepartmentId] = useState(null);

  const navigate = useNavigate();

  function ResetForm() {
    setForm({ name: "", image: null });
  }

  function GetAll() {
    try {
      axios.get("http://localhost:8081/department?universityId=" + queryParam.get("id")).then((d) => {
        setDepartments(d.data.depData);
      });
    } catch (error) {
      alert("Fail to fetch Data !!!");
    }
  }

  useEffect(() => {
    GetAll();
  }, []);

  function SaveDepartment() {
    try {
      let formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);
      formData.append("universityId", queryParam.get("id"));
      axios
        .post("http://localhost:8081/department", formData, {
          "content-type": "multipart/form-data",
        })
        .then((d) => {
          alert(d.data.message);
          GetAll();
          ResetForm();
        });
    } catch (error) {
      alert("Fail to Submit Data !!!");
    }
  }

  function UpdateDepartment() {
    try {
      let formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);
      formData.append("universityId", queryParam.get("id"));
      formData.append("id", departmentId);
      axios
        .put("http://localhost:8081/department", formData, {
          "content-type": "multipart/form-data",
        })
        .then((d) => {
          alert(d.data.message);
          GetAll();
          ResetForm();
        });
    } catch (error) {
      alert("Fail to Submit Data !!!");
    }
  }

  function DeleteDepartment(id) {
    try {
      let ans = window.confirm("Want to delete Data ??");
      if (!ans) return;
      axios
        .delete("http://localhost:8081/department", { data: { id: id } })
        .then((d) => {
          alert(d.data.message);
          GetAll();
        });
    } catch (error) {
      alert("Fail to Submit Data !!!");
    }
  }
  const changeHandler = (e) => {
    setForm({...form , [e.target.name]: e.target.value });
  }

  function OnDepartmentSubmit() {
    let errors = false;
    let error = { name: "", image: "" };

    if (form.name.trim().length == 0) {
      errors = true;
      error = { ...error, name: "University Name Empty" };
    }
    if (form.image == null) {
      errors = true;
      error = { ...error, image: "Image is Required" };
    }
    if (errors) {
      setFormError(error);
    } else {
      setFormError(error);
      departmentId ? UpdateDepartment() : SaveDepartment();
    }
  }

  function renderDepartment()
  {
    return departments?.map((item) => {
      return(
        <tr>
          <img
            src={"http://localhost:8081/" + item.image}
            style={{ width: "200px", height: "auto" }}
          />
          <td>{item.name}</td>
          <td>
            <button className="btn btn-primary">Add Product</button>
          </td>
          <td>
            <button className="btn btn-info">Edit</button>
          </td>
          <td>
            <button className="btn btn-danger">Delete</button>
          </td>
        </tr>
      );
    });
  }

  return (
    <div>
      <Header />
      <div className="row p-2 m-2">
        <div class="card text-center mx-auto">
          <div class="card-header bg-info text-white">
            {departmentId ? "Edit Department" : "New Department"};
          </div>
          <div class="card-body">
            <div className="form-group row">
              <label className="col-4">University Name</label>
              <div className="col-8">
                <input
                  type="text"
                  value={queryParam.get("name")}
                  disabled
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-4">Department Name</label>
              <div className="col-8">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  onChange={changeHandler}
                  placeholder="Department Name"
                />
                <p className="form-danger">{formError.name}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-4">Department Image</label>
              <div className="col-8">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => {
                    let file = e.target.files[0];
                    setForm({...form, image: file});
                  }}
                />
                <p className="form-danger">{formError.image}</p>
              </div>
            </div>
          </div>
          <div class="card-footer text-muted">
            <button className="btn btn-info"
            onClick={() => {
              OnDepartmentSubmit()
            }}>
            {departmentId? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
      <div className="border p-2 m-2">
        <table className="table table-bordered table-striped table-active">
          <thead>
            <tr>
              <th>Department Name</th>
              <th>Department Image</th>
              <th>Add Product</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {renderDepartment()}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Department;
