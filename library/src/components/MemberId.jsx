import { useEffect, useState } from "react";
import axios from "axios";

function MemberId(props) {
  const { selectedMemberId, onMemberSelect } = props;
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    async function fetchMemberList() {
      try {
        const response = await axios.get("http://localhost:8080/members/all", {
          headers: { Authorization: sessionStorage.getItem("token") },
        });
        setMemberList(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchMemberList();
  }, []);

  return (
    <select value={selectedMemberId} onChange={(e) => onMemberSelect(e.target.value)}>
      <option value={null}>Available</option>
      {memberList.map((member) => (
        <option key={member.id} value={member.id}>
          {`${member.id} ${member.name} ${member.lastName}`}
        </option>
      ))}
    </select>
  );
}

export default MemberId;
