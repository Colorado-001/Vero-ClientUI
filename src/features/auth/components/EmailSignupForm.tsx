import { FormInput, RoundedButton } from "../../../components";
import { Form } from "../../../components/ui/form";
import { useCreateEmailAccount } from "../hooks";

export const EmailSignupForm = () => {
  const { form, onSubmit } = useCreateEmailAccount();
  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-8">
            <FormInput
              form={form}
              label="Email Address"
              placeholder="pelumi@vero.commitshrk.org"
              name="email"
            />

            <RoundedButton
              label="Continue with email"
              type="submit"
              className="w-full"
            />
          </div>
        </form>
      </Form>
    </div>
  );
};
