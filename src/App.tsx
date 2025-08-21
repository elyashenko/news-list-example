import { Header } from './components/Header';
import { NewsList } from './components/NewsList';
import { Loader } from './components/Loader';
import { Footer } from './components/Footer';
import { useNewsService } from './hooks/useNewsService';
import { useLoader } from './hooks/useLoader';

function App() {
  const { news, addNews, updateNews, deleteNews } = useNewsService();
  const { isLoading: loaderLoading } = useLoader(2000); // 2 секунды загрузки

  return (
    <>
      <Loader isLoading={loaderLoading} />
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-1">
          <div className="container mx-auto px-4 py-6 max-w-4xl">
            <NewsList 
              news={news} 
              onAddNews={addNews}
              onUpdateNews={updateNews}
              onDeleteNews={deleteNews}
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
