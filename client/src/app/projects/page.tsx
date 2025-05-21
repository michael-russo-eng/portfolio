export default function Projects() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
        <p className="text-lg text-gray-700 max-w-2xl">
          A collection of my work in software engineering and AI. Each project represents
          a unique challenge and learning opportunity.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Project cards will be added here */}
        <div className="border rounded-lg p-6 space-y-4 bg-white shadow-sm">
          <h3 className="text-xl font-semibold">Project Title</h3>
          <p className="text-gray-600">
            [Project description will go here. This is a placeholder for your project details,
            including technologies used, challenges overcome, and outcomes achieved.]
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-gray-100 text-sm rounded">Technology 1</span>
            <span className="px-2 py-1 bg-gray-100 text-sm rounded">Technology 2</span>
          </div>
        </div>
      </section>
    </div>
  );
} 