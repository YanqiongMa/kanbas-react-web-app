import TotalPercentageDisplay from "./TotalPercentageDisplay";
import AddButton from "./AddButton";
import OptionsButton from "./OptionsButton";

export default function GroupButtons() {
  return (
    <div className="float-end d-flex">
      <TotalPercentageDisplay percentage="40%" />
      <AddButton />
      <OptionsButton />
    </div>
  );
}

