import { useEffect, useState } from 'react'
import { getBlogPosts, BlogPost } from '../lib/supabase'

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('Tümü')

  useEffect(() => {
    async function loadBlogPosts() {
      try {
        const data = await getBlogPosts()
        setBlogPosts(data)
      } catch (error) {
        console.error('Error loading blog posts:', error)
      } finally {
        setLoading(false)
      }
    }
    loadBlogPosts()
  }, [])

  // Get unique categories from blog posts
  const categories = ['Tümü', ...Array.from(new Set(blogPosts.map(post => post.category)))]

  // Filter posts by category
  const filteredPosts = selectedCategory === 'Tümü' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('tr-TR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  }

  return (
    <div className="bg-primary min-h-screen">
      {/* Hero */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070)',
          }}
        >
          <div className="absolute inset-0 bg-primary-dark/70"></div>
        </div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-gold mb-4">
            Blog
          </h1>
          <p className="text-xl text-beige-light">
            Güzellik, sağlık ve wellness ipuçları
          </p>
        </div>
      </section>

      {/* Categories */}
      {!loading && categories.length > 0 && (
        <section className="py-8 bg-primary-light sticky top-20 z-40 shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-accent text-primary'
                      : 'bg-primary text-beige border border-gold/20 hover:border-gold/60'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
              <p className="text-beige/60 mt-4">Blog yazıları yükleniyor...</p>
            </div>
          ) : filteredPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article 
                    key={post.id}
                    className="bg-primary-light rounded-2xl overflow-hidden border border-gold/20 hover:border-gold/60 hover:shadow-2xl transition-all group"
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-accent text-primary px-3 py-1 rounded-full text-sm font-semibold">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-beige/60 text-sm mb-3">
                        <i className="fas fa-calendar"></i>
                        <span>{formatDate(post.published_at)}</span>
                      </div>
                      
                      <h3 className="text-xl font-heading font-bold text-gold mb-3 group-hover:text-accent transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-beige/70 mb-4">
                        {post.excerpt}
                      </p>
                      
                      <button className="text-accent hover:text-gold transition-colors font-semibold flex items-center gap-2">
                        Devamını Oku
                        <i className="fas fa-arrow-right"></i>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-beige/60">Bu kategoride henüz blog yazısı bulunmamaktadır.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-accent/10 to-gold/10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <i className="fas fa-envelope-open text-5xl text-gold mb-6"></i>
            <h2 className="text-3xl font-heading font-bold text-gold mb-4">
              Blog Güncellemelerini Kaçırmayın
            </h2>
            <p className="text-beige/80 mb-6">
              En yeni güzellik ipuçları ve özel tekliflerden haberdar olmak için bültenimize kaydolun
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-4 py-3 rounded-lg bg-primary border border-gold/20 text-beige focus:outline-none focus:border-gold"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-gold transition-colors"
              >
                Abone Ol
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BlogPage
