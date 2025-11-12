import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = 'https://nofpllfekouldgxgyunu.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vZnBsbGZla291bGRneGd5dW51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NzcwNDQsImV4cCI6MjA3ODQ1MzA0NH0.KfmYheXhjnG7Q9OWC6PiAr8IW38VlXRCXJnpQJIV1AM';
    this.supabase = createClient(supabaseUrl, supabaseKey);
    
    // Make service available globally for console access (only in browser)
    if (typeof window !== 'undefined') {
      (window as any).supabaseService = this;
    }
  }

  async addEmailToDatabase(email: string): Promise<void> {
    await this.supabase
      .from('emails')
      .insert([{ email: email.toLowerCase().trim() }]);
  }

  // Call in console: await supabaseService.getAllEmails();
  async getAllEmails(): Promise<string[]> {
    const { data } = await this.supabase
      .from('emails')
      .select('email');
    return data?.map(row => row.email) || [];
  }
}