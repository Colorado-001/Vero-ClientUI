import { FormInput, RoundedButton } from "../../../components";
import { Form } from "../../../components/ui/form";
import { useLogin } from "../hooks/useLogin";

export const LoginForm = () => {
  const { form, onSubmit, loading } = useLogin();

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
              loading={loading}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};
