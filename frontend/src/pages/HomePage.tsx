import LoginModal from "../components/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import SignupModal from "../components/SignupModal";
import { toggleSignMethod } from "../store/signMethodStore";

const HomePage = () => {
//   @ts-ignore
  const signMethod=useSelector((store)=>store.signMethod.value);
  const dispatch=useDispatch();
  console.log('signMethod : ',signMethod);

  return (
    <div className="w-screen h-[90vh] bg-[#121212]">
         <div className="w-full h-full flex">
            <div className="w-2/3 flex flex-col gap-12 px-8 py-32">
            <p className="text-6xl font-serif font-bold text-center text-slate-100 leading-[4rem]">
                Discover the latest insights and trends
            </p>
            <p className="text-2xl font-medium text-slate-300 text-center">
                Stay up-to-date with our featured blog posts and dive into the world
                of technology, business, and innovation.
            </p>
            <div className="flex justify-center">
                <button className="p-2 px-8 text-white border text-xl font-medium bg-sky-600
                 border-slate-600 w-max rounded-lg text-center" onClick={()=>{
                    dispatch(toggleSignMethod('signin'))
                 }}>Get Started Now</button>
            </div>
            </div>
            <div className="w-1/3 p-8 flex flex-col justify-center">
            <img className="p-0 rounded-md"
                src="https://miro.medium.com/v2/resize:fit:1024/1*yBt65HhmARbqZDDJ1McFDg.png"
                loading="lazy"
                />
            </div>
        </div>
        {signMethod=='signin' && <LoginModal/>}
        {signMethod=='signup' && <SignupModal/>}
    </div>
  );
}

export default HomePage