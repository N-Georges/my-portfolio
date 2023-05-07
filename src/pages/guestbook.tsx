import Layout from "@/components/layout";
import { signIn, signOut, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Send, Power, BrandGithub, ArrowRight } from "tabler-icons-react";
import { Guestbook } from "../../types/schema";
import { useEffect } from "react";
import clsx from "clsx";
import { getGuestbook } from "../../sanity/sanity-utils";
import { formatDistanceToNow } from "date-fns";

export default function GuestbookPage({
  guestbook,
}: {
  guestbook: Guestbook[];
}) {
  const { data: session } = useSession();

  const { register, handleSubmit, setValue, reset, formState } =
    useForm<Guestbook>({
      defaultValues: {
        name: session?.user?.name as string,
        email: session?.user?.email as string,
        message: "",
      },
    });

  useEffect(() => {
    setValue("name", session?.user?.name as string);
    setValue("email", session?.user?.email as string);
  }, [session?.user?.email, session?.user?.name, setValue]);

  const onSubmit = (data: Guestbook) => {
    fetch("/api/createMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    reset();
  };

  return (
    <Layout>
      <section>
        <div className="max-w-screen-lg px-5 py-10 mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-5xl font-bold ">Guestbook</h1>
            {session && (
              <button
                onClick={() => signOut()}
                className="flex items-center transition-colors delay-100 hover:text-cyan-500"
              >
                <Power className="inline-block w-8 h-8 sm:mr-2" />
                <span className="hidden sm:flex">Sign Out</span>
              </button>
            )}
          </div>
          {!session && (
            <button
              onClick={() => signIn("github")}
              className="flex rounded text-left hover:border-cyan-500 items-center px-5 py-2.5 border border-gray-900 w-fit"
            >
              <BrandGithub className="inline-block w-5 h-5 mr-2" />
              <span>Login with Github</span>
            </button>
          )}

          {session && (
            <div className="mb-2 space-x-1">
              <span>Hello,</span>
              <span>{session.user?.name}</span>
            </div>
          )}
          {session && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex space-x-2">
                <label
                  htmlFor="UserMessage"
                  className="relative flex-1 block px-3 pt-3 overflow-hidden border border-gray-500 rounded focus-within:border-cyan-500"
                >
                  <input
                    {...register("message", { required: true })}
                    name="message"
                    type="text"
                    id="UserMessage"
                    placeholder="Message"
                    maxLength={255}
                    className="w-full h-8 p-0 placeholder-transparent bg-transparent border-none border-cyan-500 focus:ring-cyan-500 peer focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />

                  <span className="absolute text-xs text-gray-500 transition-all -translate-y-1/2 start-3 top-3 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    Your messsage
                  </span>
                </label>
                <div>
                  <button
                    type="submit"
                    disabled={formState.isSubmitting}
                    className={clsx(
                      "h-full px-4 space-x-2 rounded bg-cyan-500 hover:bg-cyan-700",
                      {
                        "opacity-50 cursor-not-allowed": formState.isSubmitting,
                      }
                    )}
                  >
                    <Send className="inline-block w-5 h-5" />
                  </button>
                </div>
              </div>
            </form>
          )}

          <div className="py-10 space-y-10">
            {guestbook?.map((message) => (
              <div
                key={message._id}
                className="flex prose text-gray-100 prose-neutral prose-invert"
              >
                <div className="flex items-start space-x-2">
                  <div className="flex items-center justify-between mb-1 leading-relaxed">
                    <div className="font-bold whitespace-nowrap">
                      <span className="">{message.name}:</span>
                      {/* <ArrowRight className="inline-block w-4 h-4 ml-2" /> */}
                      <span className="flex justify-start text-xs">
                        {/* {new Date(message._createdAt).toLocaleString()} */}
                        {formatDistanceToNow(new Date(message._createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="px-4 pt-2 pb-2 border border-gray-900 rounded">
                    <p className="leading-snug text-normal md:leading-normal">
                      {message.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const guestbooks = await getGuestbook();
  console.log(guestbooks);

  return {
    props: {
      guestbook: guestbooks,
    },
  };
}

// export async function getServerSideProps() {
//   const guestbooks = await getGuestbook();
//   console.log(guestbooks);

//   return {
//     props: {
//       guestbook: guestbooks,
//     },
//   };
// }
