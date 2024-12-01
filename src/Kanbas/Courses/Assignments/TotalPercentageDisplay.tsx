export default function TotalPercentageDisplay({ percentage }: { percentage: string }) {
    return (
      <div
        className="border border-dark d-block me-2"
        style={{ borderRadius: "20px" }}
      >
        <span className="fw-normal m-3">{percentage} of Total</span>
      </div>
    );
  }
  