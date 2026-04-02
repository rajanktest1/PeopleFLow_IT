resource "azurerm_key_vault" "main" {
  name                       = "kv-peopleflow-${var.environment}"
  location                   = azurerm_resource_group.main.location
  resource_group_name        = azurerm_resource_group.main.name
  tenant_id                  = data.azurerm_client_config.current.tenant_id
  sku_name                   = "standard"
  soft_delete_retention_days = 7
  purge_protection_enabled   = true

  # Access for Terraform operator
  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    secret_permissions = [
      "Get", "List", "Set", "Delete", "Purge", "Recover"
    ]
  }

  # Access for AKS Key Vault CSI driver
  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = azurerm_kubernetes_cluster.main.key_vault_secrets_provider[0].secret_identity[0].object_id

    secret_permissions = [
      "Get", "List"
    ]
  }

  tags = azurerm_resource_group.main.tags
}

# Store secrets
resource "azurerm_key_vault_secret" "db_password" {
  name         = "POSTGRES-PASSWORD"
  value        = var.db_admin_password
  key_vault_id = azurerm_key_vault.main.id
}

resource "azurerm_key_vault_secret" "jwt_secret" {
  name         = "JWT-SECRET"
  value        = var.jwt_secret
  key_vault_id = azurerm_key_vault.main.id
}

resource "azurerm_key_vault_secret" "database_url" {
  name         = "DATABASE-URL"
  value        = "postgresql://peopleflow:${var.db_admin_password}@postgres:5432/peopleflow"
  key_vault_id = azurerm_key_vault.main.id
}
