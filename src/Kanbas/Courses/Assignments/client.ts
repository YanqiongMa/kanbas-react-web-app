import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENT_API = `${REMOTE_SERVER}/api/assignments`;
export const deleteAssignment = async (assignmentId:String) => {
      const response = await axios.delete(`${ASSIGNMENT_API}/${assignmentId}`);
      return response.data;
};
  
export const updateAssignment = async (assignment:any) => {
      const { data } = await axios.put(`${ASSIGNMENT_API}/${assignment._id}`, assignment);
      return data;
};

  
  