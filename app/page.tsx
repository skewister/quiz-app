import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img className="block lg:hidden h-12 w-auto" src="https://tse3.mm.bing.net/th/id/OIG3.mlVe82OmlanNckIAy4mO?pid=ImgGn" alt="Logo" />
                <img className="hidden lg:block h-12 w-auto" src="https://tse3.mm.bing.net/th/id/OIG3.mlVe82OmlanNckIAy4mO?pid=ImgGn" alt="Logo" />
              </div>
              <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                <a href="" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">Accueil</a>
                <a href="/dashboard/carte" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">Carte</a>
                <a href="/dashboard/quiz-multi" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">Quiz</a>
                <a href="/dashboard/quizdeux" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">Quiz multi-réponses</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800">Page d'accueil</h1>
        <p className="text-gray-600 mt-2">Bienvenue sur notre site !</p>
      </div>
    </div>
  );
}

export default Home;
