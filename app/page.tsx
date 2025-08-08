import Hero from "@/components/(front-end)/hero";
import Image from "next/image";
import { getBanners } from "@/actions/banners";
import { Suspense } from "react";
import { type Banner } from "@prisma/client";
import { getQuizzes } from "@/actions/quizzes";
import Link from "next/link";
interface PageData {
  banners: Banner[];
  quizzes:any;
}
async function getPageData(): Promise<PageData> {
  const [bannersData,quizzes] = await Promise.all([getBanners(),getQuizzes()]);

  return {
    banners: bannersData?.data ?? [],
    quizzes:quizzes?.data ?? []
  };
}

export default async function Home() {
  const { banners,quizzes } = await getPageData();

  return (
    <div>
      {" "}
      <div className="">
        <Suspense>
          <Hero banners={banners} />
          {/* {JSON.stringify(banners)} */}
        </Suspense>
      </div>
      <section className="bg-white dark:bg-gray-900">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              WHO WE ARE?
            </h2>
            <p className="mb-4">
              We are strategists, designers and developers. Innovators and
              problem solvers. Small enough to be simple and quick, but big
              enough to deliver the scope you want at the pace you need. Small
              enough to be simple and quick, but big enough to deliver the scope
              you want at the pace you need.
            </p>
            <p>
              We are strategists, designers and developers. Innovators and
              problem solvers. Small enough to be simple and quick.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <Image
              width={500}
              height={500}
              src={banners[0]?.imageUrl}
              className="w-full rounded-lg object-cover"
              alt={banners[0]?.title}
              priority
            />
            <Image
              width={500}
              height={500}
              src={banners[1]?.imageUrl}
              className="mt-4 w-full lg:mt-10 rounded-lg object-cover"
              alt={banners[1]?.title}
              priority
            />

            {/* <img className="w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" alt="office content 1"/>
            <img className="mt-4 w-full lg:mt-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2"/> */}
          </div>
        </div>
      </section>
      <section>
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid  lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="text-center mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              EDUCATION MATERIALS
            </h2>
            <p className="mb-4">
              We are strategists, designers and developers. Innovators and
              problem solvers. Small enough to be simple and quick, but big
              enough to deliver the scope you want at the pace you need. Small
              enough to be simple and quick, but big enough to deliver the scope
              you want at the pace you need.
            </p>
            <p>
              We are strategists, designers and developers. Innovators and
              problem solvers. Small enough to be simple and quick.
            </p>
              {/* {JSON.stringify(quizzes)} */}
            <div className="  md:flex gap-2">
              {
                quizzes?.map((quiz:any,i:number)=>{
                  return <div className="w-full mb-5  bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <Link  href="">

<Image
              width={500}
              height={500}
              src={banners[1]?.imageUrl}
              className="p-8 rounded-t-lg w-full  object-cover"
              alt={banners[1]?.title}
              priority
            />
    </Link>
    <div className="px-5 pb-5">
        <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{quiz?.name}</h5>
        </a>
        
        <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white"></span>
            <Link href={`/quizzes/${quiz?.slug}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">GO {`->`}</Link>
        </div>
    </div>
</div>

                })
              }


            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
