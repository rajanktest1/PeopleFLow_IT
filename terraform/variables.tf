variable "location" {
  description = "Azure region for all resources"
  type        = string
  default     = "East US"
}

variable "environment" {
  description = "Environment name (e.g. prod, staging)"
  type        = string
  default     = "prod"
}

variable "acr_name" {
  description = "Azure Container Registry name (globally unique, alphanumeric only)"
  type        = string
  default     = "peopleflowacr"
}

variable "aks_node_count" {
  description = "Initial number of AKS nodes"
  type        = number
  default     = 2
}

variable "aks_vm_size" {
  description = "VM size for AKS nodes"
  type        = string
  default     = "Standard_B2s"
}

variable "aks_min_count" {
  description = "Minimum nodes for auto-scaling"
  type        = number
  default     = 1
}

variable "aks_max_count" {
  description = "Maximum nodes for auto-scaling"
  type        = number
  default     = 3
}

variable "db_admin_password" {
  description = "PostgreSQL admin password"
  type        = string
  sensitive   = true
}

variable "jwt_secret" {
  description = "JWT signing secret for the backend"
  type        = string
  sensitive   = true
}
