export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: { id: string; email: string; role: string; created_at: string };
        Insert: { id?: string; email: string; role?: string; created_at?: string };
        Update: { id?: string; email?: string; role?: string; created_at?: string };
      };
      audit_logs: {
        Row: {
          id: string;
          actor_email: string;
          action: string;
          entity_type: string;
          entity_id: string | null;
          metadata: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          actor_email: string;
          action: string;
          entity_type: string;
          entity_id?: string | null;
          metadata?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          actor_email?: string;
          action?: string;
          entity_type?: string;
          entity_id?: string | null;
          metadata?: Json | null;
          created_at?: string;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string;
          category: string;
          author: string;
          content: string;
          cover_image: string | null;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          description: string;
          category: string;
          author: string;
          content: string;
          cover_image?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          description?: string;
          category?: string;
          author?: string;
          content?: string;
          cover_image?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          role: string | null;
          quote: string;
          avatar_image: string | null;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          role?: string | null;
          quote: string;
          avatar_image?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          role?: string | null;
          quote?: string;
          avatar_image?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      managed_services: {
        Row: {
          id: string;
          slug: string;
          title: string;
          headline: string;
          short_description: string;
          description: string;
          who_its_for: string;
          outcomes: string[];
          cover_image: string | null;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          headline: string;
          short_description: string;
          description: string;
          who_its_for: string;
          outcomes: string[];
          cover_image?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          headline?: string;
          short_description?: string;
          description?: string;
          who_its_for?: string;
          outcomes?: string[];
          cover_image?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string;
          consultation_type: string;
          service_interest: string;
          preferred_date: string;
          preferred_time: string;
          additional_notes: string | null;
          status: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          phone: string;
          consultation_type: string;
          service_interest: string;
          preferred_date: string;
          preferred_time: string;
          additional_notes?: string | null;
          status?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          phone?: string;
          consultation_type?: string;
          service_interest?: string;
          preferred_date?: string;
          preferred_time?: string;
          additional_notes?: string | null;
          status?: string | null;
          created_at?: string;
        };
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          message: string;
          archived: boolean | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          message: string;
          archived?: boolean | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          message?: string;
          archived?: boolean | null;
          created_at?: string;
        };
      };
      packages: {
        Row: {
          id: string;
          slug: string;
          name: string;
          subtitle: string;
          price_label: string;
          amount: number;
          description: string;
          features: string[];
          deliverables: string[];
          popular: boolean;
          published: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          subtitle: string;
          price_label: string;
          amount: number;
          description: string;
          features: string[];
          deliverables: string[];
          popular?: boolean;
          published?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          subtitle?: string;
          price_label?: string;
          amount?: number;
          description?: string;
          features?: string[];
          deliverables?: string[];
          popular?: boolean;
          published?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      site_settings: {
        Row: {
          id: string;
          facebook_url: string | null;
          instagram_url: string | null;
          x_url: string | null;
          tiktok_url: string | null;
          linkedin_url: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          facebook_url?: string | null;
          instagram_url?: string | null;
          x_url?: string | null;
          tiktok_url?: string | null;
          linkedin_url?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          facebook_url?: string | null;
          instagram_url?: string | null;
          x_url?: string | null;
          tiktok_url?: string | null;
          linkedin_url?: string | null;
          updated_at?: string;
        };
      };
    };
  };
};