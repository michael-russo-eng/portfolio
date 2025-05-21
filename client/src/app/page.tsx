import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Mike Russo</h1>
        <h2 className="text-2xl text-gray-600">Software Engineer & AI Enthusiast</h2>
        <p className="text-lg text-gray-700 max-w-2xl">
          Welcome to my portfolio! I'm a software engineer with a passion for Generative AI and building innovative solutions.
          This space showcases my journey, projects, and interests in technology.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold">About Me</h3>
        <div className="prose prose-lg max-w-none">
          <p>
            [Your detailed introduction will go here. This is a placeholder for your personal story,
            background, and what drives your interest in software engineering and AI.]
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold">Skills & Expertise</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Software Development</h4>
            <ul className="list-disc list-inside text-gray-700">
              <li>Full-stack Development</li>
              <li>TypeScript/JavaScript</li>
              <li>React/Next.js</li>
              <li>[Add more skills]</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">AI & Machine Learning</h4>
            <ul className="list-disc list-inside text-gray-700">
              <li>Generative AI</li>
              <li>Large Language Models</li>
              <li>[Add more AI skills]</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
