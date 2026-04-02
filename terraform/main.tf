terraform {
  required_version = ">= 1.5.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.100"
    }
  }

  # Uncomment to use Azure Storage backend for remote state
  # backend "azurerm" {
  #   resource_group_name  = "rg-terraform-state"
  #   storage_account_name = "tfstatepeopleflow"
  #   container_name       = "tfstate"
  #   key                  = "peopleflow.terraform.tfstate"
  # }
}

provider "azurerm" {
  features {
    key_vault {
      purge_soft_delete_on_destroy = false
    }
  }
}

data "azurerm_client_config" "current" {}

resource "azurerm_resource_group" "main" {
  name     = "rg-peopleflow-${var.environment}"
  location = var.location

  tags = {
    Project     = "PeopleFlow"
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}
