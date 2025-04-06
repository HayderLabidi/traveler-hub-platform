
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Calendar, 
  User, 
  Tag, 
  ThumbsUp,
  MessageSquare,
  Share2,
  ChevronRight,
  Clock
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  const categories = [
    { id: "all", name: "All Posts" },
    { id: "tips", name: "Ridesharing Tips" },
    { id: "safety", name: "Safety" },
    { id: "tech", name: "Technology" },
    { id: "environment", name: "Environment" },
    { id: "stories", name: "Passenger Stories" },
  ];
  
  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for a Safe Rideshare Experience",
      excerpt: "Learn how to stay safe while using rideshare services with these important tips.",
      date: new Date(2024, 2, 15),
      author: "Safety Team",
      category: "safety",
      image: "https://images.unsplash.com/photo-1581222772880-e16a0396c7ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJpZGVzaGFyZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      readTime: "5 min read",
      likes: 124,
      comments: 18
    },
    {
      id: 2,
      title: "How Carpooling Reduces Your Carbon Footprint",
      excerpt: "Discover the environmental impact of sharing rides and how it contributes to a greener planet.",
      date: new Date(2024, 2, 10),
      author: "Eco Team",
      category: "environment",
      image: "https://images.unsplash.com/photo-1622607514229-7f32b2b21269?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdyZWVuJTIwZWFydGh8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      readTime: "7 min read",
      likes: 89,
      comments: 12
    },
    {
      id: 3,
      title: "The Future of Ridesharing: AI and Self-Driving Cars",
      excerpt: "Explore how artificial intelligence and autonomous vehicles are transforming the ridesharing industry.",
      date: new Date(2024, 2, 5),
      author: "Tech Team",
      category: "tech",
      image: "https://images.unsplash.com/photo-1553260579-1b48e6c71121?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2VsZiUyMGRyaXZpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      readTime: "10 min read",
      likes: 156,
      comments: 24
    },
    {
      id: 4,
      title: "My First Year as a Rideshare Passenger",
      excerpt: "A personal story about the convenience, savings, and friendships made through ridesharing.",
      date: new Date(2024, 1, 28),
      author: "Sarah M.",
      category: "stories",
      image: "https://images.unsplash.com/photo-1516733968668-dbdce39c4651?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGZyaWVuZHMlMjBpbiUyMGNhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      readTime: "8 min read",
      likes: 78,
      comments: 9
    },
    {
      id: 5,
      title: "How to Save Money on Daily Commutes",
      excerpt: "Smart strategies for reducing your transportation costs with ridesharing and carpooling.",
      date: new Date(2024, 1, 20),
      author: "Finance Team",
      category: "tips",
      image: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2F2aW5nJTIwbW9uZXl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      readTime: "6 min read",
      likes: 112,
      comments: 15
    },
    {
      id: 6,
      title: "Essential Ridesharing Etiquette for Passengers",
      excerpt: "Learn the unwritten rules of ridesharing to ensure a pleasant experience for everyone involved.",
      date: new Date(2024, 1, 15),
      author: "Customer Experience",
      category: "tips",
      image: "https://images.unsplash.com/photo-1543269664-7eef42226a21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGFzc2VuZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      readTime: "4 min read",
      likes: 95,
      comments: 22
    },
  ];

  const filteredPosts = blogPosts
    .filter(post => activeCategory === "all" || post.category === activeCategory)
    .filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-3/4 space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl font-bold mb-2">RideShare Blog</h1>
              <p className="text-muted-foreground">Stay updated with the latest ridesharing news, tips, and stories</p>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search articles..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Categories (Tabs) */}
            <Tabs defaultValue="all" onValueChange={setActiveCategory}>
              <TabsList className="w-full overflow-x-auto flex whitespace-nowrap py-1 mb-4">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="flex-1">
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Blog Posts */}
              {categories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="mt-0">
                  {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredPosts.map((post) => (
                        <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
                          <div className="aspect-video relative">
                            {post.image && (
                              <img 
                                src={post.image} 
                                alt={post.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                            <Badge className="absolute top-2 right-2">
                              {categories.find(c => c.id === post.category)?.name}
                            </Badge>
                          </div>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                              <Calendar className="h-3 w-3" />
                              <time>{format(post.date, "MMMM d, yyyy")}</time>
                              <span className="inline-block mx-1">•</span>
                              <Clock className="h-3 w-3" />
                              <span>{post.readTime}</span>
                            </div>
                            <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                            <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <User className="h-3 w-3" />
                              <span>{post.author}</span>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between items-center px-4 pb-4 pt-0">
                            <div className="flex space-x-4">
                              <button className="text-muted-foreground hover:text-primary flex items-center gap-1">
                                <ThumbsUp className="h-4 w-4" />
                                <span>{post.likes}</span>
                              </button>
                              <button className="text-muted-foreground hover:text-primary flex items-center gap-1">
                                <MessageSquare className="h-4 w-4" />
                                <span>{post.comments}</span>
                              </button>
                              <button className="text-muted-foreground hover:text-primary">
                                <Share2 className="h-4 w-4" />
                              </button>
                            </div>
                            <Button variant="ghost" size="sm" className="gap-1">
                              Read More <ChevronRight className="h-4 w-4" />
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No articles found matching your criteria</p>
                      <Button variant="link" onClick={() => {
                        setSearchQuery("");
                        setActiveCategory("all");
                      }}>
                        Clear filters
                      </Button>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4 space-y-6">
            {/* Popular Posts */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Posts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {blogPosts
                  .sort((a, b) => b.likes - a.likes)
                  .slice(0, 3)
                  .map((post) => (
                    <div key={post.id} className="flex items-start gap-3 hover:bg-accent/50 p-2 rounded-md transition-colors">
                      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm line-clamp-2">{post.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Calendar className="h-3 w-3" />
                          <time>{format(post.date, "MMM d, yyyy")}</time>
                        </div>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories
                    .filter(category => category.id !== "all")
                    .map((category) => (
                      <button
                        key={category.id}
                        className="flex items-center justify-between w-full p-2 rounded-md hover:bg-accent/50 transition-colors"
                        onClick={() => setActiveCategory(category.id)}
                      >
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4 text-muted-foreground" />
                          <span>{category.name}</span>
                        </div>
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                          {blogPosts.filter(post => post.category === category.id).length}
                        </span>
                      </button>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Subscribe */}
            <Card>
              <CardHeader>
                <CardTitle>Subscribe</CardTitle>
                <CardDescription>
                  Get the latest articles delivered to your inbox
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <Input
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button className="w-full">Subscribe</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Blog;
