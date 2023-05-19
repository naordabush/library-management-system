import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import MemberRow from "./MemberRow";
import AddMember from "./AddMember";

function MemberTable() {
  const [searchCategory, setSearchCategory] = useState("Name");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);

  const navigate = useNavigate();

  const [isError, setIsError] = useState("");
  const [isSuccess, setIsSuccess] = useState("");

  const [isAddMember, setIsAddMember] = useState(false);
  const [memberList, setMemberList] = useState([]);

  const RenderTable = () => (
    <>
      {filteredMembers.map((member, index) => (
        <MemberRow
          key={member.id}
          member={member}
          place={index + 1}
          delete={(id) => {
            deleteRow(id);
          }}
          modify={member.id}
          save={(currentMember) => saveRow(currentMember)}
        />
      ))}
    </>
  );

  useEffect(() => {
    const filteredMembers = memberList.filter((member) => {
      const { name, lastName, complaints } = member;

      if (searchCategory === "Name") {
        return name.toLowerCase().includes(searchTerm.toLowerCase()) || lastName.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (searchCategory === "Complaints") {
        return complaints.toString() === searchTerm;
      } else if (searchCategory === "Complaints Bigger Than") {
        return complaints > parseInt(searchTerm, 10);
      } else if (searchCategory === "Complaints Smaller Than") {
        return complaints < parseInt(searchTerm, 10);
      }

      return true;
    });

    setFilteredMembers(filteredMembers);
  }, [memberList, searchCategory, searchTerm]);

  async function addMember(data) {
    if (!data.name || !data.lastName) {
      return;
    }

    try {
      const requestData = {
        name: data.name,
        lastName: data.lastName,
        complaints: data.complaints,
      };

      const response = await axios.post("http://localhost:8080/members/add", requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token"),
        },
        body: JSON.stringify(requestData),
      });

      setIsAddMember(false);
      fetchMemberList();
      if (response.status === 200) {
        setIsError("");
        setIsSuccess("The member was added successfully");
      } else {
        setIsSuccess("");
        setIsError("The member is already exist! please add another one.");
      }
      setTimeout(() => {
        setIsSuccess("");
        setIsError("");
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  }

  async function saveRow(data) {
    try {
      const requestData = {
        id: data.id,
        name: data.name,
        lastName: data.lastName,
        complaints: data.complaints,
      };

      const response = await axios.put("http://localhost:8080/members/edit", requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token"),
        },
      });

      fetchMemberList();

      if (response.status === 200) {
        setIsError("");
        setIsSuccess("The member was modified successfully");
      } else {
        setIsSuccess("");
        setIsError("couldn't update the member! please try again.");
      }
      setTimeout(() => {
        setIsSuccess("");
        setIsError("");
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteRow(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this member?");
    if (!confirmDelete) {
      return;
    }
    try {
      const response = await axios.delete(`http://localhost:8080/members/remove/${id}`, {
        headers: { Authorization: sessionStorage.getItem("token") },
      });

      fetchMemberList();
      if (response.status === 200) {
        setIsError("");
        setIsSuccess("The member was deleted successfully");
      } else {
        setIsSuccess("");
        setIsError("couldn't delete the member! please try again.");
      }
      setTimeout(() => {
        setIsSuccess("");
        setIsError("");
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  }

  function handleAddMember() {
    setIsAddMember(true);
  }

  function handleCancelAddMember() {
    setIsAddMember(false);
  }

  function handleBackButton() {
    navigate("/table");
  }

  async function fetchMemberList() {
    axios
      .get("http://localhost:8080/members/all", { headers: { Authorization: sessionStorage.getItem("token") } })
      .then((response) => {
        setMemberList([...response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchMemberList();
  }, []);
  return (
    <>
      <div className="container">
        <h1>member list</h1>

        <div className="search-container">
          <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

          <select value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)}>
            <option value="Name">Search by Name</option>
            <option value="Complaints">Search by Complaints (Equal)</option>
            <option value="Complaints Bigger Than">Search by Complaints (Bigger Than)</option>
            <option value="Complaints Smaller Than">Search by Complaints (Smaller Than)</option>
          </select>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>name</th>
              <th>last name</th>
              <th>complains</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <RenderTable />
            {isAddMember ? <AddMember onCancel={handleCancelAddMember} save={addMember} /> : null}
          </tbody>
        </table>
        <div className="button-container">
          <button className="button memberList" onClick={handleBackButton}>
            Back
          </button>
          <button className="button add_member" onClick={handleAddMember}>
            Add Member
          </button>
        </div>
        {isError ? <p className="error">{isError}</p> : null}
        {isSuccess ? <p className="success">{isSuccess}</p> : null}
      </div>
    </>
  );
}

export default MemberTable;
