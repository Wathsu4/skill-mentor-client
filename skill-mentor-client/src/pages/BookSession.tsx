import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useApi } from "@/services/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function BookSession() {
  const { classId } = useParams();
  const navigate = useNavigate();
  const api = useApi();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("classroomId", classId || "");
    formData.append("dateTime", data.dateTime);
    formData.append("paymentProof", data.paymentProof[0]);

    try {
      await api.post("/api/student/bookings", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 max-w-md mx-auto"
    >
      <div>
        <Label>Date & Time</Label>
        <Input
          type="datetime-local"
          {...register("dateTime", { required: true })}
        />
        {errors.dateTime && <p className="text-red-500">Date is required</p>}
      </div>
      <div>
        <Label>Upload Payment Slip</Label>
        <Input
          type="file"
          accept="image/*"
          {...register("paymentProof", { required: true })}
        />
        {errors.paymentProof && (
          <p className="text-red-500">Payment slip is required</p>
        )}
      </div>
      <Button type="submit">Book Session</Button>
    </form>
  );
}
