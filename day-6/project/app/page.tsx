 
import AirMax from "@/components/AirMax";
import DontMiss from "@/components/DontMiss";
import Essential from "@/components/Essential";
import Featured from "@/components/Featured";
import GearUp from "@/components/GearUp";
import Hero from "@/components/Hero";
import Icons from "@/components/icons";
import TopHeader from "@/components/TopHeader";
import Link from "next/link";
 

export default function Home() {
  return (
         <div className="">
          <TopHeader/>
          <Link href="/sign-in"> 
         <Hero />
         <AirMax />
         <Featured />
         <GearUp />
         <DontMiss />
         <Essential />
         <Icons />
         </Link>

         </div>
  );
}

