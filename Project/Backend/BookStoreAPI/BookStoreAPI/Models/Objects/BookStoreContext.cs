using System;
using BookStoreAPI.Helper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace BookStoreAPI.Models.Objects
{
    public partial class BookStoreContext : DbContext
    {
        public BookStoreContext()
        {
        }

        public BookStoreContext(DbContextOptions<BookStoreContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Account> Account { get; set; }
        public virtual DbSet<Author> Author { get; set; }
        public virtual DbSet<AuthorBook> AuthorBook { get; set; }
        public virtual DbSet<Book> Book { get; set; }
        public virtual DbSet<BookCategory> BookCategory { get; set; }
        public virtual DbSet<Cart> Cart { get; set; }
        public virtual DbSet<CartBook> CartBook { get; set; }
        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<Comment> Comment { get; set; }
        public virtual DbSet<FamousPublisher> FamousPublisher { get; set; }
        public virtual DbSet<Form> Form { get; set; }
        public virtual DbSet<FormBook> FormBook { get; set; }
        public virtual DbSet<ImageBook> ImageBook { get; set; }
        public virtual DbSet<Order> Order { get; set; }
        public virtual DbSet<OrderDetail> OrderDetail { get; set; }
        public virtual DbSet<Promotion> Promotion { get; set; }
        public virtual DbSet<PromotionDetail> PromotionDetail { get; set; }
        public virtual DbSet<Publisher> Publisher { get; set; }
        public virtual DbSet<PublisherBook> PublisherBook { get; set; }
        public virtual DbSet<Rating> Rating { get; set; }
        public virtual DbSet<Region> Region { get; set; }
        public virtual DbSet<SubCategory> SubCategory { get; set; }
        public virtual DbSet<Supplier> Supplier { get; set; }
        public virtual DbSet<SupplierBook> SupplierBook { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<WishList> WishList { get; set; }
        public virtual DbSet<RawBook> RawBook { get; set; }
        public virtual DbSet<BookViewTracking> BookViewTracking { get; set; }
        public virtual DbSet<SearchHistory> SearchHistory { get; set; }
        public virtual DbSet<FaceBookAccount> FaceBookAccount { get; set; }
        public virtual DbSet<EBook> EBook { get; set; }
        public virtual DbSet<SubscriptionEmail> SubscriptionEmail { get; set; }
        public virtual DbSet<CouponCode> CouponCode { get; set; }
        public virtual DbSet<EbookPayment> EbookPayment { get; set; }
        public virtual DbSet<EbookRentalPolicy> EbookRentalPolicy { get; set; }
        public virtual DbSet<UserEbook> UserEbook { get; set; }
        public virtual DbSet<BookNumber> BookNumber { get; set; }
        public virtual DbSet<ImportReceipt> ImportReceipt { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(SettingHelper.ConnectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<Account>(entity =>
            {
                entity.HasIndex(e => e.Email)
                    .HasName("U_Email")
                    .IsUnique();

                entity.HasIndex(e => e.Username)
                    .HasName("U_Username")
                    .IsUnique();

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.HasOne(d => d.IdNavigation)
                    .WithOne(p => p.Account)
                    .HasForeignKey<Account>(d => d.Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Account_User");
            });

            modelBuilder.Entity<Author>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            modelBuilder.Entity<AuthorBook>(entity =>
            {
                entity.HasKey(e => new { e.BookId, e.AuthorId });

                entity.HasOne(d => d.Author)
                    .WithMany(p => p.AuthorBook)
                    .HasForeignKey(d => d.AuthorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AuthorBook_Author");

                entity.HasOne(d => d.Book)
                    .WithMany(p => p.AuthorBook)
                    .HasForeignKey(d => d.BookId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AuthorBook_Book");
            });

            modelBuilder.Entity<Book>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            modelBuilder.Entity<BookCategory>(entity =>
            {
                entity.HasKey(e => new { e.BookId, e.CateId });

                entity.HasOne(d => d.Book)
                    .WithMany(p => p.BookCategory)
                    .HasForeignKey(d => d.BookId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BookCategory_Book");

                entity.HasOne(d => d.Cate)
                    .WithMany(p => p.BookCategory)
                    .HasForeignKey(d => d.CateId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BookCategory_SubCategory");
            });

            modelBuilder.Entity<Cart>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.HasOne(d => d.IdNavigation)
                    .WithOne(p => p.Cart)
                    .HasForeignKey<Cart>(d => d.Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Cart_User");
            });

            modelBuilder.Entity<CartBook>(entity =>
            {
                entity.HasKey(e => new { e.CartId, e.BookId });

                entity.HasOne(d => d.Book)
                    .WithMany(p => p.CartBook)
                    .HasForeignKey(d => d.BookId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CartBook_Book");

                entity.HasOne(d => d.Cart)
                    .WithMany(p => p.CartBook)
                    .HasForeignKey(d => d.CartId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CartBook_Cart");
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                //entity.HasKey(e => new { e.UserId, e.BookId });
                //entity.Property(e => e.Id).ValueGeneratedNever();

                entity.HasOne(d => d.Book)
                    .WithMany(p => p.Comment)
                    .HasForeignKey(d => d.BookId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Comment_Book");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Comment)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Comment_User");
            });

            modelBuilder.Entity<FamousPublisher>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            modelBuilder.Entity<Form>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            modelBuilder.Entity<FormBook>(entity =>
            {
                entity.HasKey(e => new { e.BookId, e.FormId });

                entity.HasOne(d => d.Book)
                    .WithMany(p => p.FormBook)
                    .HasForeignKey(d => d.BookId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_FormBook_Book");

                entity.HasOne(d => d.Form)
                    .WithMany(p => p.FormBook)
                    .HasForeignKey(d => d.FormId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_FormBook_Form");
            });

            modelBuilder.Entity<ImageBook>(entity =>
            {
                entity.HasKey(e => new { e.BookId, e.ImageId })
                    .HasName("PK_RawImageBook");

                entity.HasOne(d => d.Book)
                    .WithMany(p => p.ImageBook)
                    .HasForeignKey(d => d.BookId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ImageBook_Book");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Order)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Order_User");
            });

            modelBuilder.Entity<OrderDetail>(entity =>
            {
                entity.HasKey(e => new { e.OrderId, e.BookId });

                entity.HasOne(d => d.Book)
                    .WithMany(p => p.OrderDetail)
                    .HasForeignKey(d => d.BookId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrderDetail_Book");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderDetail)
                    .HasForeignKey(d => d.OrderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrderDetail_Order");
            });

            modelBuilder.Entity<Promotion>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            modelBuilder.Entity<PromotionDetail>(entity =>
            {
                entity.HasKey(e => new { e.PromotionId, e.BookId });

                entity.HasOne(d => d.Book)
                    .WithMany(p => p.PromotionDetail)
                    .HasForeignKey(d => d.BookId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PromotionDetail_Book");

                entity.HasOne(d => d.Promotion)
                    .WithMany(p => p.PromotionDetail)
                    .HasForeignKey(d => d.PromotionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PromotionDetail_Promotion");
            });

            modelBuilder.Entity<Publisher>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            modelBuilder.Entity<PublisherBook>(entity =>
            {
                entity.HasKey(e => new { e.BookId, e.PublisherId });

                entity.HasOne(d => d.Book)
                    .WithMany(p => p.PublisherBook)
                    .HasForeignKey(d => d.BookId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PublisherBook_Book");

                entity.HasOne(d => d.Publisher)
                    .WithMany(p => p.PublisherBook)
                    .HasForeignKey(d => d.PublisherId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PublisherBook_Publisher");
            });

            modelBuilder.Entity<Rating>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.BookId });

                entity.HasOne(d => d.Book)
                    .WithMany(p => p.Rating)
                    .HasForeignKey(d => d.BookId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Rating_Book");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Rating)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Rating_User");
            });

            modelBuilder.Entity<SubCategory>(entity =>
            {
                entity.HasOne(d => d.Cate)
                    .WithMany(p => p.SubCategory)
                    .HasForeignKey(d => d.CateId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SubCategory_Category");
            });

            modelBuilder.Entity<Supplier>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            modelBuilder.Entity<SupplierBook>(entity =>
            {
                entity.HasKey(e => new { e.BookId, e.SupplierId });

                entity.HasOne(d => d.Book)
                    .WithMany(p => p.SupplierBook)
                    .HasForeignKey(d => d.BookId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SupplierBook_Book");

                entity.HasOne(d => d.Supplier)
                    .WithMany(p => p.SupplierBook)
                    .HasForeignKey(d => d.SupplierId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SupplierBook_Supplier");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            modelBuilder.Entity<WishList>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.BookId });

                entity.HasOne(d => d.Book)
                    .WithMany(p => p.WishList)
                    .HasForeignKey(d => d.BookId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_WishList_Book");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.WishList)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_WishList_User");
            });

            modelBuilder.Entity<RawBook>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            modelBuilder.Entity<BookViewTracking>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.HasOne(d => d.Book)
                    .WithMany(p => p.BookViewTracking)
                    .HasForeignKey(d => d.BookId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BookViewTracking_Book");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.BookViewTracking)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BookViewTracking_User");
            });

            modelBuilder.Entity<SearchHistory>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.HasOne(d => d.User)
                    .WithOne(p => p.SearchHistory)
                    .HasForeignKey<SearchHistory>(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SearchHistory_User");
            });

            modelBuilder.Entity<FaceBookAccount>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.HasOne(d => d.IdNavigation)
                    .WithOne(p => p.FaceBookAccount)
                    .HasForeignKey<FaceBookAccount>(d => d.Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_FaceBookAccount_User");
            });

            modelBuilder.Entity<EBook>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            modelBuilder.Entity<CouponCode>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            modelBuilder.Entity<SubscriptionEmail>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<EbookPayment>(entity =>
            {
                entity.Property(e => e.PaymentId).ValueGeneratedNever();

                entity.HasOne(d => d.Policy)
                    .WithMany(p => p.EbookPayment)
                    .HasForeignKey(d => d.PolicyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_EBookPayment_EBookRentalPolicy");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.EbookPayment)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_EBookPayment_UserEBook");
            });

            modelBuilder.Entity<EbookRentalPolicy>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            modelBuilder.Entity<UserEbook>(entity =>
            {
                entity.Property(e => e.UserId).ValueGeneratedNever();

                entity.HasOne(d => d.User)
                    .WithOne(p => p.UserEbook)
                    .HasForeignKey<UserEbook>(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserEBook_User");
            });

            modelBuilder.Entity<BookNumber>(entity =>
            {
                entity.Property(e => e.BookId).ValueGeneratedNever();

                entity.HasOne(d => d.Book)
                    .WithOne(p => p.BookNumber)
                    .HasForeignKey<BookNumber>(d => d.BookId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BookNumber_Book");
            });

            modelBuilder.Entity<ImportReceipt>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();
            });
        }
    }
}
