import ArticleForm from "../components/ArticleForm";

export default function NewArticle() {
  const initialState = {
    id: "",
    headline: "",
    date: "",
    category: "",
    article: "",
  };
  return <ArticleForm formData={initialState} />;
}
