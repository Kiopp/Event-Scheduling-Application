# Configure the Azure providers
provider "azuread" {}

# Create a Resource Group named "DESAP" in Sweden Central
resource "azurerm_resource_group" "desap" {
  name     = "DESAP"
  location = "Sweden Central"
}

# Look up the three users by their User Principal Names (UPNs)
data "azuread_user" "noca22tf" {
  user_principal_name = "noca22tf@student.ju.se"
}

data "azuread_user" "beax22tr" {
  user_principal_name = "beax22tr@student.ju.se"
}

data "azuread_user" "weje22wy" {
  user_principal_name = "weje22wy@student.ju.se"
}

# Assign the Owner role to each user on the DESAP Resource Group

resource "azurerm_role_assignment" "noca22tf_assignment" {
  scope                = azurerm_resource_group.desap.id
  role_definition_name = "Owner"
  principal_id         = data.azuread_user.noca22tf.object_id
}

resource "azurerm_role_assignment" "beax22tr_assignment" {
  scope                = azurerm_resource_group.desap.id
  role_definition_name = "Owner"
  principal_id         = data.azuread_user.beax22tr.object_id
}

resource "azurerm_role_assignment" "weje22wy_assignment" {
  scope                = azurerm_resource_group.desap.id
  role_definition_name = "Owner"
  principal_id         = data.azuread_user.weje22wy.object_id
}

resource "azurerm_container_registry" "acr" {
  name                = var.acr_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
  admin_enabled       = true
}

resource "azurerm_kubernetes_cluster" "aks" {
  name                = var.aks_cluster_name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "${var.aks_cluster_name}-dns"

  default_node_pool {
    name       = "default"
    node_count = var.node_count
    vm_size    = var.node_vm_size
  }

  identity {
    type = "SystemAssigned"
  }

  tags = {
    Environment = "Development"
  }
}
