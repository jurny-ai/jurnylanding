const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 dark:bg-[#0f1110]/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/bb454a78-d8c4-4776-aa28-246c06947dfc.png" 
            alt="Jurny Logo" 
            className="h-5 opacity-90" 
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
