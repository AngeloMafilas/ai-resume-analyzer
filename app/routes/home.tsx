import type { Route } from "./+types/home";
import Navbar from "../components/Navbar";
import { resumes } from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useNavigate } from "react-router";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart Feedback for Your Resume" },
  ];
}

export default function Home() {
    const {auth, isLoading} = usePuterStore();
    const navigate = useNavigate();
    useEffect(()=>{
        if(!isLoading && !auth.isAuthenticated) navigate('/auth?next=/');
    }, [auth.isAuthenticated, isLoading, navigate])
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover bg-center bg-no-repeat">
    <Navbar />
    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Track your applications & Resume Rankings</h1>
        <h2>Upload your resume and get instant, AI-driven feedback to help you land your dream job.</h2>
      </div>
    
    {resumes.length > 0 && (
<div className="resumes-section">
    {resumes.map((resume)=> (
        <ResumeCard key={resume.id} resume={resume}/>
      ))
    }
</div>
    )}
</section>
  </main>
}
