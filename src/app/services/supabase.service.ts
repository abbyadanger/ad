/*
   This service handles DB interactions with Supabase
 */

import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

interface PublicAppConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabaseClientPromise: Promise<SupabaseClient>;

  constructor() {
    this.supabaseClientPromise = this.createSupabaseClient();
  }

  private async createSupabaseClient(): Promise<SupabaseClient> {
    const response = await fetch('/app-config.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Unable to load app config.');
    }

    const config = (await response.json()) as PublicAppConfig;
    if (!config.supabaseUrl || !config.supabaseAnonKey) {
      throw new Error('Supabase config is missing.');
    }

    return createClient(config.supabaseUrl, config.supabaseAnonKey);
  }

  private async getSupabaseClient(): Promise<SupabaseClient> {
    return this.supabaseClientPromise;
  }

  /* Method to add an email to the database */
  async addEmailToDatabase(email: string): Promise<void> {
    const supabase = await this.getSupabaseClient();
    await supabase
      .from('emails')
      .insert([{ email: email.toLowerCase().trim() }]);
  }

  /* Method to retrieve all emails from the database */
  async getAllEmails(): Promise<string[]> {
    const supabase = await this.getSupabaseClient();
    const { data } = await supabase
      .from('emails')
      .select('email');
    return data?.map(row => row.email) || [];
  }
}