import { Layout } from "@components/layouts";
import { Button, Input } from "@components/ui";
import { UserContext } from "@contexts";
import { useFetcher } from "@remix-run/react";
import { useContext, useState } from "react";

const fields = [
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "Contact Number", key: "contactNo" },
  { label: "Family Number", key: "familyNo" },
  { label: "School", key: "school" },
  { label: "Thai ID", key: "thaiId" },
];

function ProfileField({ index, formData, setFormData }: any) {
  return (
    <div className="flex justify-between w-full">
      <Input
        field={
          formData[fields[index].key] == "undefined"
            ? "Unknown"
            : formData[fields[index].key]
        }
        setField={(val) =>
          setFormData({ ...formData, [fields[index].key]: val })
        }
        label={fields[index].label}
        type="text"
      />
    </div>
  );
}

export default function Profile() {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState(user);
  const fetcher = useFetcher();
  const handleSubmit = () => {
    const data = { id: user.id, formData };
    fetcher.submit({ data: JSON.stringify(data) }, { method: "post" });
  };
  return (
    <Layout title="Profile">
      <div className="flex justify-center w-full">
        <div className="grid grid-cols-2 gap-4 w-[640px]">
          {fields.map((_, index) => (
            <ProfileField
              key={index}
              index={index}
              formData={formData}
              setFormData={setFormData}
            />
          ))}
          <div className="flex justify-end col-span-2 pointer-events-auto">
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-br from-primary-700 to-primary-500 hover:from-primary-600 hover:to-primary-400 text-white"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
