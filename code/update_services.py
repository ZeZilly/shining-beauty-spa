#!/usr/bin/env python3

import os
import sys

# Supabase client setup
from supabase import create_client, Client

# Get environment variables
url = "https://gkmdojnjzdullfxpkjvg.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrZGRvam5qemR1bGxmeHBranZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk5MjYyNjYsImV4cCI6MjA0NTUwMjI2Nn0.kvLx0p-YBRtEVGhUCFzfSqg4g5h8mZxJfNWNMiLQdVk"

try:
    # Initialize Supabase client
    supabase: Client = create_client(url, key)
    
    print("Supabase bağlantısı başarılı!")
    
    # Get all services first
    services_response = supabase.table('services').select('*').execute()
    services = services_response.data
    
    print(f"\nToplam hizmet sayısı: {len(services)}")
    
    # Find hair care services
    hair_care_services = [service for service in services if 'hair' in service['category'].lower() or 'saç' in service['category'].lower()]
    
    if not hair_care_services:
        # Also check for hair care in service names
        hair_care_services = [service for service in services if 'hair' in service['name'].lower() or 'saç' in service['name'].lower()]
    
    print(f"\nBulunan saç bakımı hizmetleri: {len(hair_care_services)}")
    
    for service in hair_care_services:
        print(f"- {service['name']} ({service['category']})")
    
    if hair_care_services:
        # Delete hair care services
        service_ids = [service['id'] for service in hair_care_services]
        
        print(f"\nSaç bakımı hizmetleri siliniyor...")
        
        # Delete each service
        for service_id in service_ids:
            result = supabase.table('services').delete().eq('id', service_id).execute()
            print(f"Hizmet ID {service_id} silindi.")
        
        print(f"\n✅ {len(hair_care_services)} saç bakımı hizmeti başarıyla silindi!")
    else:
        print("❌ Saç bakımı hizmeti bulunamadı.")
    
    # Show remaining services
    remaining_response = supabase.table('services').select('*').execute()
    remaining_services = remaining_response.data
    
    print(f"\nKalan hizmet sayısı: {len(remaining_services)}")
    
    # Group by category
    categories = {}
    for service in remaining_services:
        category = service['category']
        if category not in categories:
            categories[category] = []
        categories[category].append(service['name'])
    
    print("\nKalan kategoriler:")
    for category, service_names in categories.items():
        print(f"\n{category}:")
        for name in service_names:
            print(f"  - {name}")

except Exception as e:
    print(f"❌ Hata: {e}")
    sys.exit(1)