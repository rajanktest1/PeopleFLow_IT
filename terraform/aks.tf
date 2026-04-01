resource "azurerm_kubernetes_cluster" "main" {
  name                = "aks-peopleflow-${var.environment}"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  dns_prefix          = "peopleflow-${var.environment}"

  default_node_pool {
    name                = "default"
    vm_size             = var.aks_vm_size
    node_count          = var.aks_node_count
    min_count           = var.aks_min_count
    max_count           = var.aks_max_count
    enable_auto_scaling = true
    vnet_subnet_id      = azurerm_subnet.aks.id
    os_disk_size_gb     = 30

    node_labels = {
      "environment" = var.environment
    }
  }

  identity {
    type = "SystemAssigned"
  }

  network_profile {
    network_plugin    = "azure"
    load_balancer_sku = "standard"
    service_cidr      = "10.1.0.0/16"
    dns_service_ip    = "10.1.0.10"
  }

  key_vault_secrets_provider {
    secret_rotation_enabled  = true
    secret_rotation_interval = "2m"
  }

  oms_agent {
    log_analytics_workspace_id = azurerm_log_analytics_workspace.main.id
  }

  tags = azurerm_resource_group.main.tags
}

resource "azurerm_log_analytics_workspace" "main" {
  name                = "law-peopleflow-${var.environment}"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  sku                 = "PerGB2018"
  retention_in_days   = 30

  tags = azurerm_resource_group.main.tags
}
